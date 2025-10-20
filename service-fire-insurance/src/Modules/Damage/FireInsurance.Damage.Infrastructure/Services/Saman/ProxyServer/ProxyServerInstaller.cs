using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;

namespace FireInsurance.Damage.Infrastructure.Services.Saman.ProxyServer;

public static class ProxyServerInstaller
{
    public static void AddProxyServer(this IServiceCollection services)
    {
        services
            .AddOptions<ProxyOptions>()
            .BindConfiguration(ProxyOptionsSetup.SECTION_NAME)
            .ValidateDataAnnotations()
            .ValidateOnStart();

        services.TryAddSingleton(sp => sp.GetRequiredService<IOptions<ProxyOptions>>().Value);
    }
}
