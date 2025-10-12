using Common.Interfaces;
using FireInsurance.Users.Application.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace FireInsurance.Users.Infrastructure.Services.Identity;

public static class JwtAuthenticationInstaller
{
    public static void AddJwtAuthentication(this IServiceCollection services)
    {
        services.AddJwtOptions();

        var sp = services.BuildServiceProvider();
        var jwtOptions = sp.GetRequiredService<JwtOptions>();

        // JWT settings (replace with your config)
        var jwtKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.SigningKey));
        var jwtIssuer = jwtOptions.Issuer;
        var jwtAudience = jwtOptions.Audience;

        JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
        JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap.Clear();

        //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        //    options =>
        //    {
        //        options.SigningKey = Base64Encoding.Encode(jwtOptions.SigningKey);
        //    },
        //    options =>
        //    {
        //        options.TokenValidationParameters.ValidIssuer = jwtOptions.Issuer;
        //        options.TokenValidationParameters.ValidAudience = jwtOptions.Audience;
        //        options.TokenValidationParameters.ClockSkew = TimeSpan.Zero;
        //        options.MapInboundClaims = false;

        //        options.Events = new JwtBearerEvents
        //        {
        //            OnTokenValidated = async context =>
        //            {
        //                var claimsPrincipal = context.Principal;

        //                var jti = claimsPrincipal?.FindFirst(JwtRegisteredClaimNames.Jti)?.Value;
        //                if (string.IsNullOrEmpty(jti))
        //                {
        //                    context.Fail("Token does not contain JTI claim");
        //                    return;
        //                }

        //                var cache = context.HttpContext.RequestServices.GetRequiredService<IUsersCachingService>();

        //                //var rawToken = context.Request.Headers.Authorization.ToString().Replace("Bearer ", "");

        //                if (!await cache.ValidateToken(jti))
        //                {
        //                    context.Fail("Token is blacklisted");
        //                }
        //            }
        //        };
        //    });

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = jwtKey,

                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromSeconds(60),

                ValidateIssuer = !string.IsNullOrEmpty(jwtIssuer),
                ValidIssuer = jwtIssuer,

                ValidateAudience = !string.IsNullOrEmpty(jwtAudience),
                ValidAudience = jwtAudience,

                NameClaimType = "sub",
                RoleClaimType = "role",
            };

            //set defaults
            //options.TokenValidationParameters.IssuerSigningKeyResolver = JwtSigningOptions.KeyResolver;

            options.MapInboundClaims = false;
        });

        // Add authorization
        services.AddAuthorization();

        services.AddHttpContextAccessor();

        services.AddScoped<IClaimsProvider, ClaimsProvider>();
    }

    private static void AddJwtOptions(this IServiceCollection services)
    {
        services
            .AddOptions<JwtOptions>()
            .BindConfiguration(JwtOptionsSetup.SECTION_NAME)
            .ValidateDataAnnotations()
            .ValidateOnStart();

        services.TryAddSingleton(sp => sp.GetRequiredService<IOptions<JwtOptions>>().Value);

        services.TryAddScoped<IJwtTokenService, JwtTokenService>();
    }
}
