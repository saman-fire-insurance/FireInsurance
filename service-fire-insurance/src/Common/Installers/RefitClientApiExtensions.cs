using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Refit;
using Shared.Utils;
using Shila.ServiceDefaults.Abstractions.ApiKeyAuthorization;
using Shila.ServiceDefaults.Abstractions.RestApiClients;
using System.Text.Json.Serialization;

namespace Shila.ServiceDefaults;

public static class RefitClientApiExtensions
{
    public static IHostApplicationBuilder AddIdentityClientApi(this IHostApplicationBuilder builder)
    {
        var services = builder.Services;
        var configuration = builder.Configuration;

        var identitySection = configuration.GetSection("Identity");
        if (!identitySection.Exists())
        {
            return builder;
        }

        var identityUrlExternal = identitySection.GetRequiredValue("Issuer");

        var apiKeySection = configuration.GetSection("ApiKeyAuthorization");
        if (!apiKeySection.Exists())
        {
            return builder;
        }

        var hashKey = apiKeySection.GetRequiredValue("HMACKey");
        var apiKey = apiKeySection.GetRequiredValue("ApiKey");
        var hashedApiKey = HashUtils.HashByHMAC(hashKey, apiKey);

        var serializer = SystemTextJsonContentSerializer.GetDefaultJsonSerializerOptions();
        serializer.Converters.Remove(serializer.Converters.Single(x => x.GetType().Equals(typeof(JsonStringEnumConverter))));
        var refitSettings = new RefitSettings
        {
            ContentSerializer = new SystemTextJsonContentSerializer(serializer)
        };

        builder.Services
            .AddRefitClient<IIdentityApi>(refitSettings)
            .ConfigureHttpClient((sp, httpClient) =>
            {
                httpClient.BaseAddress = new Uri(identityUrlExternal);
                httpClient.DefaultRequestHeaders.Add(ApiKeyConstants.HeaderName, hashedApiKey);
            });

        return builder;
    }
}
