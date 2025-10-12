using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace FireInsurance.Users.Infrastructure.Services.ProxyServer;

internal sealed class ProxyOptionsSetup(IConfiguration configuration) : IConfigureOptions<ProxyOptions>
{
    public const string SECTION_NAME = "ProxyServer";

    public void Configure(ProxyOptions options)
    {
        configuration.GetSection(SECTION_NAME).Bind(options);
    }
}
