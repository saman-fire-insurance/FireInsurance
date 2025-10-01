using Common.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Reflection;

namespace Common.Installers
{
    public static class ModuleInstaller
    {
        public static IServiceCollection InstallModules(
            this IServiceCollection services,
            IConfiguration configuration,
            IHostEnvironment environment,
            params Assembly[] assemblies)
        {
            var installers = assemblies
                .SelectMany(x => x.DefinedTypes)
                .Where(IsAssignableToType<IModuleInstaller>)
                .Select(Activator.CreateInstance)
                .Cast<IModuleInstaller>();

            foreach (var installer in installers)
            {
                installer.Install(services, configuration, environment);
            }

            return services;
        }

        private static bool IsAssignableToType<T>(TypeInfo typeInfo)
        {
            return typeof(T).IsAssignableFrom(typeInfo) && !typeInfo.IsInterface && !typeInfo.IsAbstract;
        }
    }

}
