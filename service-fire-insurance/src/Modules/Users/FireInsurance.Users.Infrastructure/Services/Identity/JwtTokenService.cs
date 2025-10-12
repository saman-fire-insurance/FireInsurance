using Ardalis.Result;
using Common.Constants;
using FireInsurance.Users.Application.Services;
using FireInsurance.Users.Application.UseCases.Commands;
using FireInsurance.Users.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace FireInsurance.Users.Infrastructure.Services.Identity
{
    public class JwtTokenService(
        JwtOptions jwtOptions,
        UserManager<User> userManager,
        IUsersCachingService cachingService,
        ILogger<JwtTokenService> logger) : IJwtTokenService
    {
        private readonly JwtOptions _jwtOptions = jwtOptions;
        private readonly UserManager<User> _userManager = userManager;
        private readonly IUsersCachingService _cachingService = cachingService;
        private readonly ILogger<JwtTokenService> _logger = logger;

        public async Task<TokenDto> GenerateTokenAsync(User user, CancellationToken cancellationToken = default)
        {
            var jti = Guid.NewGuid().ToString();
            var accessTokenExpiry = DateTime.UtcNow.AddMinutes(_jwtOptions.AccessTokenExpirationInMinutes);
            var refreshTokenExpiry = DateTime.UtcNow.AddDays(_jwtOptions.RefreshTokenExpirationInDays);

            var accessToken = GenerateAccessToken(user, jti, accessTokenExpiry);
            var refreshToken = GenerateRefreshToken();

            await _userManager.SetAuthenticationTokenAsync(user, "Default", "RefreshToken", refreshToken);

            _logger.LogInformation("Generated tokens for user {UserId}", user.Id);

            return new TokenDto(accessToken, accessTokenExpiry, refreshToken, refreshTokenExpiry);

        }

        public async Task<TokenDto> RefreshTokenAsync(string refreshToken, CancellationToken cancellationToken = default)
        {
            var principal = GetPrincipalFromExpiredToken(refreshToken) ??
                throw new SecurityException("Invalid refresh token");

            var userId = principal.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                throw new SecurityException("Invalid token claims");
            }

            var user = await _userManager.FindByIdAsync(userId) ??
                throw new SecurityException("User not found");

            var storedRefreshToken = await _userManager.GetAuthenticationTokenAsync(user, "Default", "RefreshToken");

            if (storedRefreshToken != refreshToken)
            {
                throw new SecurityException("Invalid refresh token");
            }

            // Revoke old access token
            var oldJti = principal.FindFirst(JwtRegisteredClaimNames.Jti)?.Value;
            if (!string.IsNullOrEmpty(oldJti))
            {
                var exp = principal.FindFirst(JwtRegisteredClaimNames.Exp)?.Value;
                if (long.TryParse(exp, out var expUnix))
                {
                    var expiration = DateTimeOffset.FromUnixTimeSeconds(expUnix).DateTime;
                    await RevokeTokenAsync(oldJti, expiration, cancellationToken);
                }
            }

            return await GenerateTokenAsync(user, cancellationToken);
        }

        public async Task RevokeTokenAsync(string jti, DateTime expiration, CancellationToken cancellationToken = default)
        {
            await _cachingService.InvalidateToken(jti, expiration, cancellationToken);
            _logger.LogInformation("Revoked token with JTI: {Jti}", jti);
        }

        private string GenerateAccessToken(User user, string jti, DateTime expiration)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.SigningKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.Id),
                new(JwtRegisteredClaimNames.PhoneNumber, user.PhoneNumber ?? string.Empty),
                new(JwtRegisteredClaimNames.Jti, jti),
                new(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
                //new(JwtRegisteredClaimNames.Exp, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
                //u.Permissions.AddRange(result.Value.Permissions)
            };

            if (user.Admin)
            {
                claims.Add(new(CustomClaimType.IsAdmin, true.ToString()));
            }

            if (user.SuperAdmin)
            {
                claims.Add(new(CustomClaimType.IsSuperAdmin, true.ToString()));
            }

            var token = new JwtSecurityToken(
                issuer: _jwtOptions.Issuer,
                audience: _jwtOptions.Audience,
                claims: claims,
                expires: expiration,
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private static string GenerateRefreshToken()
        {
            var randomBytes = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomBytes);
            return Convert.ToBase64String(randomBytes);
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.SigningKey));

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = true,
                ValidIssuer = _jwtOptions.Issuer,
                //ValidateAudience = true,
                //ValidAudience = _jwtOptions.Audience,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            try
            {
                var principal = tokenHandler.ValidateToken(token, validationParameters, out _);
                return principal;
            }
            catch
            {
                return null;
            }
        }
    }
}
