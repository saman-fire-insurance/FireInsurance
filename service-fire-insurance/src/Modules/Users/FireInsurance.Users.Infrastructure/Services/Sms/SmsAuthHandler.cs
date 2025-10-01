using FireInsurance.Users.Infrastructure.Services;
using Microsoft.Extensions.Logging;
using Refit;
using System.Net;
using System.Net.Http.Headers;
using System.Text.Json;

namespace FireInsurance.Users.Infrastructure.Services.Sms;

public sealed class SmsAuthHandler(
    ISmsAuthApi authApi,
    ISmsTokenCache tokenCache,
    ILogger<SmsAuthHandler> logger,
    SmsProviderOptions options) : DelegatingHandler
{

    private static readonly SemaphoreSlim _tokenSemaphore = new(1, 1);
    private const int MaxRetries = 3;
    private static readonly TimeSpan InitialRetryDelay = TimeSpan.FromSeconds(1);

    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request,
        CancellationToken cancellationToken)
    {
        var isOnStage = options.Username == "ParaTechTest";
        logger.LogInformation($"Environment: {(isOnStage ? "Stage" : "Production")}");

        // Don't add auth header for token requests
        if (request.RequestUri?.PathAndQuery.Contains("/api/auth/login") == true ||
            request.RequestUri?.PathAndQuery.Contains("/api/v1/users/authenticate") == true)
        {
            return await base.SendAsync(request, cancellationToken);
        }

        var tokenRequest = new TokenRequest
        {
            UserName = options.Username,
            Password = options.Password,
        };

        var newExpiration = DateTime.UtcNow.AddDays(1);

        // Use semaphore to prevent multiple concurrent token refreshes
        await _tokenSemaphore.WaitAsync(cancellationToken);

        try
        {
            var token = await tokenCache.GetTokenAsync();
            if (string.IsNullOrEmpty(token))
            {
                logger.LogInformation("[SmsAuthHandler:SendAsync] SMS auth token not found in cache or expired. Requesting new token.");

                TokenResponse response;
                
                response = await authApi.GetTokenAsync(tokenRequest);
                //var manualToken = await ManualGetToken() ?? throw new("Failed to get token manually. response was null");

                // Cache the new token
                token = response.Result;
                await tokenCache.SetTokenAsync(token, newExpiration);

                logger.LogInformation("[SmsAuthHandler:SendAsync] New SMS auth token cached until {ExpireTime}", newExpiration);
            }

            logger.LogInformation("[SmsAuthHandler:SendAsync] SMS auth token read from cache successfully");
            request.Headers.Authorization = new AuthenticationHeaderValue("bearer", token);
        }
        catch (ApiException ex)
        {
            logger.LogError(ex, $"[SmsAuthHandler:SendAsync] Failed to obtain SmsAuth token at {DateTime.UtcNow}");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "[SmsAuthHandler:SendAsync] Failed to add authorization header to SMS request");
        }

        try
        {
            var httpResponse = await base.SendAsync(request, cancellationToken);

            // If we get a 401 Unauthorized, the token might have expired
            if (httpResponse.StatusCode == HttpStatusCode.Unauthorized)
            {
                logger.LogWarning("[SmsAuthHandler:SendAsync] Received 401 Unauthorized response. Refreshing token and retrying.");

                for (int retry = 0; retry < MaxRetries; retry++)
                {
                    try
                    {
                        // Exponential backoff
                        var delay = TimeSpan.FromMilliseconds(InitialRetryDelay.TotalMilliseconds * Math.Pow(2, retry));
                        await Task.Delay(delay, cancellationToken);

                        TokenResponse response;    
                        response = await authApi.GetTokenAsync(tokenRequest);

                        //var response = await ManualGetToken();
                        if (response == null || response.Code != 200)
                        {
                            logger.LogError("[SmsAuthHandler:SendAsync] Failed to get token on retry {Retry}. Error code = {code}", retry + 1, response?.Code);
                            continue;
                        }

                        var newToken = response.Result;

                        //Cache the new token
                        await tokenCache.SetTokenAsync(newToken, newExpiration);

                        logger.LogInformation(
                            "[SmsAuthHandler:SendAsync] New SMS auth token cached until {ExpireTime} after {RetryCount} retries",
                            newExpiration, retry + 1);

                        // Update the authorization header with the new token
                        request.Headers.Authorization = new AuthenticationHeaderValue("bearer", newToken);

                        // Retry the request with the new token
                        var retryResponse = await base.SendAsync(request, cancellationToken);

                        if (retryResponse.IsSuccessStatusCode)
                        {
                            return retryResponse;
                        }

                        logger.LogWarning("[SmsAuthHandler:SendAsync] Request still failed after token refresh with status {Status}", retryResponse.StatusCode);
                    }
                    catch (Exception ex)
                    {
                        logger.LogError(ex, "[SmsAuthHandler:SendAsync] Failed to refresh token on retry {Retry}", retry + 1);
                    }
                }

                logger.LogError("[SmsAuthHandler:SendAsync] Failed to refresh token after {MaxRetries} retries", MaxRetries);
            }

            var cont = await httpResponse.Content.ReadAsStringAsync(cancellationToken);
            if (httpResponse.StatusCode != HttpStatusCode.OK)
            {
                logger.LogError($"[SmsAuthHandler:SendAsync] Failed to send sms to user. Sms Api response:\n\t{cont}");
            }

            return httpResponse;
        }
        catch (ApiException ex)
        {
            logger.LogError(ex, "[SmsAuthHandler:SendAsync] API Exception occurred");
            return new HttpResponseMessage(HttpStatusCode.UnprocessableContent);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "[SmsAuthHandler:SendAsync] Unexpected error occurred");
            return new HttpResponseMessage(HttpStatusCode.UnprocessableContent);
        }
        finally
        {
            _tokenSemaphore.Release();
        }
    }

    private async Task<TokenResponse?> ManualGetToken(string Username, string Password)
    {
        var proxyAddress = "http://188.121.118.53:3128";
        var proxyUser = "parabank";
        var proxyPassword = "mVzPam27wcoxJdw";
        var handler = new HttpClientHandler
        {
            Proxy = new WebProxy(proxyAddress)
            {
                Credentials = new NetworkCredential(proxyUser, proxyPassword)
            },
            UseProxy = true
        };

        var client = new HttpClient(handler)
        {
            BaseAddress = new Uri(options.BaseUrl + "/api/v1/users/authenticate")
        };

        var builder = new UriBuilder(client.BaseAddress);
        var query = System.Web.HttpUtility.ParseQueryString(builder.Query);
        query["username"] = options.Username;
        query["password"] = options.Password;
        builder.Query = query.ToString(); // automatically URL-encoded

        var httpRequest = new HttpRequestMessage(HttpMethod.Get, builder.ToString());

        //var curlCommand = BuildCurlCommand(httpRequest);

        var response = await client.SendAsync(httpRequest);
        if (!response.IsSuccessStatusCode)
        {
            var errContent = await response.Content.ReadAsStringAsync();

            logger.LogError($"Failed to get sms token. Status Code: {response.StatusCode}\n Content:\n{errContent}");
            return null;
        }

        var content = await response.Content.ReadAsStringAsync();
        logger.LogInformation($"response is: \n\t{content}");

        try
        {
            var tokenResponse = JsonSerializer.Deserialize<TokenResponse>(content);

            return tokenResponse;
        }
        catch (Exception ex)
        {
            logger.LogError($"Failed to deserialize SEP response. Raw Content is:\n {content}");
            return null;
        }
    }
}
