using FireInsurance.Users.Infrastructure.Services.Sms;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace FireInsurance.Users.Infrastructure.Services.Sms;

public sealed class RedisSmsTokenCache(
    IDistributedCache distributedCache,
    ILogger<RedisSmsTokenCache> logger) : ISmsTokenCache
{
    private const string TOKEN_KEY = "sms:auth:token";

    public async Task<string?> GetTokenAsync()
    {
        try
        {
            var cachedTokenJson = await distributedCache.GetStringAsync(TOKEN_KEY);

            logger.LogInformation("[RedisSmsTokenCache:GetTokenAsync] Cached token value is {CachedTokenJson}", cachedTokenJson);

            if (string.IsNullOrEmpty(cachedTokenJson))
            {
                return null;
            }

            var tokenData = JsonSerializer.Deserialize<TokenCacheData>(cachedTokenJson);

            if (tokenData is null || tokenData.ExpiresAt <= DateTime.UtcNow)
            {
                logger.LogInformation("[RedisSmsTokenCache:GetTokenAsync] Cached token is null or expired");

                await distributedCache.RemoveAsync(TOKEN_KEY);

                return null;
            }

            return tokenData.Token;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "[RedisSmsTokenCache:GetTokenAsync] Error retrieving SMS auth token from cache");

            return null;
        }
    }

    public async Task SetTokenAsync(string token, DateTime expiresAt)
    {
        try
        {            
            logger.LogInformation("[RedisSmsTokenCache:SetTokenAsync] Into Cache set method");
            
            var tokenData = new TokenCacheData
            {
                Token = token,
                ExpiresAt = expiresAt,
                CachedAt = DateTime.UtcNow
            };

            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpiration = expiresAt
            };

            var tokenJson = JsonSerializer.Serialize(tokenData);

            try
            {
                // Verify Redis connection
                await distributedCache.GetStringAsync("health-check");

                await distributedCache.SetStringAsync(
                    TOKEN_KEY,
                    tokenJson,
                    options);

                logger.LogInformation(
                    "[RedisSmsTokenCache:SetTokenAsync] Token cached successfully. Expires in {MinutesToExpiry} minutes",
                    (expiresAt - DateTime.UtcNow).TotalMinutes);

                // Verify token
                var verifyToken = await distributedCache.GetStringAsync(TOKEN_KEY);
                if (string.IsNullOrEmpty(verifyToken))
                {
                    logger.LogError("[RedisSmsTokenCache:SetTokenAsync] Token was not stored in cache!");
                    throw new Exception("Token verification failed - not found in cache after set");
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "[RedisSmsTokenCache:SetTokenAsync] Redis operation failed");
                throw;
            }

        }
        catch (Exception ex)
        {
            logger.LogError(
                ex,
                "[RedisSmsTokenCache:SetTokenAsync] Error storing SMS auth token in cache");
        }
    }

    private sealed class TokenCacheData
    {
        public string Token { get; set; } = string.Empty;

        public DateTime ExpiresAt { get; set; }

        public DateTime CachedAt { get; set; }
    }
}
