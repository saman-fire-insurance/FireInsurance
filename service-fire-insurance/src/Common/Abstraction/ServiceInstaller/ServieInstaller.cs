using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Shila.ServiceDefaults.Services;
using System.Reflection;

namespace Shila.ServiceDefaults.Abstractions.ServiceInstaller;

public static class ServiceInstaller
{
    public static IServiceCollection InstallServices(this IServiceCollection services,
                                                     IConfiguration configuration,
                                                     IHostEnvironment env,
                                                     params Assembly[] assemblies)
    {
        var serviceInstallers = assemblies.SelectMany(x => x.DefinedTypes)
                                          .Where(IsAssignableToType<IServiceInstaller>)
                                          .Select(Activator.CreateInstance)
                                          .Cast<IServiceInstaller>();

        foreach (var serviceInstaller in serviceInstallers)
        {
            serviceInstaller.Install(services, configuration, env);
        }

        return services;
    }

    private static bool IsAssignableToType<T>(TypeInfo typeInfo) => typeof(T).IsAssignableFrom(typeInfo)
                                                                    && !typeInfo.IsInterface
                                                                    && !typeInfo.IsAbstract;
}
