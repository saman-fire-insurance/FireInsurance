using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
//using OpenIddict.Validation.AspNetCore;

namespace Common.Installers;

public static class AuthenticationExtensions
{
    public static IServiceCollection AddDefaultAuthentication(this IHostApplicationBuilder builder)
    {
        var configuration = builder.Configuration;

        var services = builder.Services;

        var identitySection = configuration.GetSection("Identity");

        if (!identitySection.Exists())
        {
            // No identity section, so no authentication
            return services;
        }

        //services.AddOpenIddict()
        //        .AddValidation(options =>
        //        {
        //            // Note: the validation handler uses OpenID Connect discovery
        //            // to retrieve the address of the introspection endpoint.
        //            options.SetIssuer(identitySection.GetRequiredValue("Issuer"));
        //            options.AddAudiences(identitySection.GetRequiredValue("ClientId"));

        //            // Configure the validation handler to use introspection and register the client
        //            // credentials used when communicating with the remote introspection endpoint.
        //            options.UseIntrospection()
        //                   .SetClientId(identitySection.GetRequiredValue("ClientId"))
        //                   .SetClientSecret(identitySection.GetRequiredValue("ClientSecret"));

        //            // Register the System.Net.Http integration.
        //            options.UseSystemNetHttp();

        //            // Register the ASP.NET Core host.
        //            options.UseAspNetCore();
        //        });

        //builder.Services.AddAuthentication(OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme);

        builder.Services.AddAuthorization();

        return services;
    }

    //public static void AddApiKeyAuthorization(this IServiceCollection services)
    //{
    //    services.AddSingleton<ApiKeyAuthorizationFilter>();
    //    services.AddSingleton<IApiKeyValidator, ApiKeyValidator>();
    //}
}
