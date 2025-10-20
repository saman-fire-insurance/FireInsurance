using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace FireInsurance.Damage.Infrastructure.Services.Saman.ProxyServer;

internal sealed class ProxyOptionsSetup(IConfiguration configuration) : IConfigureOptions<ProxyOptions>
{
    public const string SECTION_NAME = "ProxyServer";

    public void Configure(ProxyOptions options)
    {
        configuration.GetSection(SECTION_NAME).Bind(options);
    }
}
