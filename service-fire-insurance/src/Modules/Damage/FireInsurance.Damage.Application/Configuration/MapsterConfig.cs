using Mapster;
using Microsoft.Extensions.DependencyInjection;

namespace FireInsurance.Damage.Application.Configuration
{
    public static class MapsterConfig
    {
        public static IServiceCollection AddMapsterConfiguration(this IServiceCollection services)
        {
            // Configure global Mapster settings to prevent infinite recursion
            TypeAdapterConfig.GlobalSettings.Default
                .PreserveReference(true);

            // Scan and apply configurations from the assembly
            TypeAdapterConfig.GlobalSettings.Scan(AssemblyReference.Assembly);

            return services;
        }
    }
}
