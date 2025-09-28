using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace FireInsurance.Insurance.Infrastructure.Services.Sms;

internal sealed class RedisOptionsSetup(IConfiguration configuration) : IConfigureOptions<RedisOptions>
{
    public const string SECTION_NAME = "Redis";

    public void Configure(RedisOptions options)
    {
        configuration.GetSection(SECTION_NAME).Bind(options);
    }
}
