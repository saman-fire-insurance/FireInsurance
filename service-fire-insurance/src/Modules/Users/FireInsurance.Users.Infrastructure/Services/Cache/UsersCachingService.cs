using FireInsurance.Users.Application.Services;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Users.Infrastructure.Services.Cache
{
    public class UsersCachingService(IDistributedCache cache, ILogger<UsersCachingService> logger) : IUsersCachingService
    {
        private readonly IDistributedCache _cache = cache;
        private readonly ILogger<UsersCachingService> _logger = logger;

        public async Task<bool> ValidateToken(string jti, CancellationToken cancellationToken)
        {
            //var jwt = ParseToken(token);
            var key = GetBlacklistKey(jti);
            var blacklistedAt = await _cache.GetStringAsync(key, cancellationToken);

            return string.IsNullOrEmpty(blacklistedAt);
        }

        public async Task InvalidateToken(string jti, DateTimeOffset expiration, CancellationToken cancellationToken)
        {
            //var jwt = ParseToken(token);

            if (string.IsNullOrEmpty(jti))
            {
                _logger.LogWarning("Attempted to invalidate token with empty JTI");
                return;
            }

            var key = GetBlacklistKey(jti);

            var ttl = expiration - DateTimeOffset.UtcNow;
            if (ttl > TimeSpan.Zero)
            {
                var options = new DistributedCacheEntryOptions
                {
                    AbsoluteExpiration = expiration
                };

                await _cache.SetStringAsync(key, DateTimeOffset.UtcNow.ToString(), options, cancellationToken);
                _logger.LogInformation("Token blacklisted with JTI: {Jti}", jti);
            }
        }

        private string GetBlacklistKey(string jti) => $"blacklist:{jti}";
    }
}
