using Ardalis.Result;
using Common.Interfaces;
using FireInsurance.Users.Application.Dtos.SamanService;
using FireInsurance.Users.Application.Services;
using FireInsurance.Users.Domain.Common.Enums;
using FireInsurance.Users.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace FireInsurance.Users.Infrastructure.Services.Saman.PersonInquiry;

public sealed class PersonInquiryService (IPersonInquiryApi inquiryApi, UserManager<User> userManager, IClaimsProvider claimsProvider, ILogger<PersonInquiryService> logger) : IPersonInquiryService
{
    public async Task<Result<PersonInquiryResponse>> GetPersonInfoAsync(string nationalCode, string birthDate)
{
    logger.LogInformation("[GetPersonInfoAsync]: Calling Saman inquiry service");

    try
    {
        var request = new PersonInquiryRequest
        {
            NationalCode = nationalCode,
            BirthDate = birthDate
        };

        var apiResponse = await inquiryApi.GetPersonInfoAsync(request);
        if (!apiResponse.IsSuccessStatusCode)
        {
            logger.LogError($"[GetPersonInfoAsync]: HTTP Error {apiResponse.StatusCode}: {apiResponse.Error?.Content}");
            if (apiResponse.Error?.Content != null)
            {
                var result = JsonSerializer.Deserialize<SamanResultDto<PersonInquiryResponse>>(apiResponse.Error.Content);
                return Result.Error(result!.Output.Message);
            }

            return Result.Error(apiResponse.Error?.Content);
        }

        var response = apiResponse.Content;
        //var response = await inquiryApi.GetPersonInfoAsync(request);
        if (response == null)
        {
            logger.LogError($"[GetPersonInfoAsync]: Response was null or unsuccessful. HTTP Error {response?.Output.Code}: {response?.Output.Message}");
            return Result.Error("Response wass null");
        }

        if (!response.IsSuccess())
        {
            logger.LogError($"[GetPersonInfoAsync]: Response was null or unsuccessful. HTTP Error {response.Output.Code}: {response.Output.Message}");
            return Result.Error(response.Output.Message ?? "خطای غیر منتظره در استعلام اطلاعات فردی!");
        }

        var inquiryResponse = response.GetResultOrDefault();
        if (inquiryResponse == null)
        {
            logger.LogError($"[GetPersonInfoAsync]: Response was null! Code: {response.Output.Code} | Message: \"{response.Output.Message}\"");
            return Result.Error("Response wass null");
        }

        inquiryResponse.NationalCode = nationalCode;

        await ApplyInquiryResultToUser(inquiryResponse);
        return Result.Success(inquiryResponse);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, ex.Message, "[GetPersonInfoAsync]: Calling Saman inquiry service");
        return Result.Error(ex.Message);
    }
}

public async Task<Result> ApplyInquiryResultToUser(PersonInquiryResponse response)
{
    var userId = claimsProvider.UserId ?? throw new("UserId was null");
    var user = await userManager.FindByIdAsync(userId) ?? throw new("User was null");
    user.ApplyInquiryResult(response.FirstName, response.LastName, response.FatherName, response.NationalCode, response.Gender ? Gender.Male : Gender.Female);
    await userManager.UpdateAsync(user);

    //await ownerService.ApplyInquiryResult(..);

    return Result.Success();
}

private static string NormalizeNationalCode(long code)
{
    return code.ToString().PadLeft(10, '0') ?? throw new Exception($"Couldn't normalize national code: {code}");
}

    //private async Task<SamanResultDto<PersonInquiryResponse>?> ManualInquiry(string nationalCode, string birthDate)
    //{
       
    //    var handler = new HttpClientHandler
    //    {
    //        Proxy = new WebProxy(proxyAddress)
    //        {
    //            Credentials = new NetworkCredential(proxyUser, proxyPassword)
    //        },
    //        UseProxy = true
    //    };

    //    var client = new HttpClient(handler)
    //    {
    //        BaseAddress = new Uri("https://eeadminpanel.si24.ir" + "/desktopmodules/bimesaman/service/V6/SamanService.svc/InquiryInformation")
    //    };

    //    var request = new PersonInquiryRequest
    //    {
    //        NationalCode = nationalCode,
    //        BirthDate = birthDate
    //    };

    //    var builder = new UriBuilder(client.BaseAddress);
    //    var serialized = JsonSerializer.Serialize(request, new JsonSerializerOptions() { PropertyNamingPolicy =  JsonNamingPolicy.CamelCase });
    //    var httpRequest = new HttpRequestMessage(HttpMethod.Post, builder.ToString())
    //    {
    //        Content = new StringContent(serialized, Encoding.UTF8, "application/json"),
    //    };

    //    httpRequest.Headers.Add("Key", key);
    //    //var curlCommand = BuildCurlCommand(httpRequest);

    //    var response = await client.SendAsync(httpRequest);
    //    if (!response.IsSuccessStatusCode)
    //    {
    //        var errContent = await response.Content.ReadAsStringAsync();

    //        logger.LogError($"Failed to get sms token. Status Code: {response.StatusCode}\n Content:\n{errContent}");
    //        return null;
    //    }

    //    var content = await response.Content.ReadAsStringAsync();
    //    logger.LogInformation($"response is: \n\t{content}");

    //    try
    //    {
    //        var tokenResponse = JsonSerializer.Deserialize<SamanResultDto<PersonInquiryResponse>>(content);

    //        return tokenResponse;
    //    }
    //    catch (Exception ex)
    //    {
    //        logger.LogError($"Failed to deserialize SEP response. Raw Content is:\n {content}");
    //        return null;
    //    }
    //}
}
