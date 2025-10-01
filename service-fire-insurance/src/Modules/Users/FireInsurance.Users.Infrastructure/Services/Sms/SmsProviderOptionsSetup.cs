using FireInsurance.Users.Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace FireInsurance.Users.Infrastructure.Services.Sms;

internal sealed class SmsProviderOptionsSetup(IConfiguration configuration) : IConfigureOptions<SmsProviderOptions>
{
    public const string SECTION_NAME = "SmsProvider";

    public void Configure(SmsProviderOptions options)
    {
        configuration.GetSection(SECTION_NAME).Bind(options);
    }
}
