using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace FireInsurance.Damage.Infrastructure.Services.Saman.SmsService;

internal sealed class SmsProviderOptionsSetup(IConfiguration configuration) : IConfigureOptions<SmsProviderOptions>
{
    public const string SECTION_NAME = "SmsProvider";

    public void Configure(SmsProviderOptions options)
    {
        configuration.GetSection(SECTION_NAME).Bind(options);
    }
}
