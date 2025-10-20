using Common.Behaviors;
using Common.Interfaces;
using FireInsurance.Damage.Infrastructure.Data;
using FireInsurance.Damage.Infrastructure.Services.FileService;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace FireInsurance.Damage.API.ModuleInstaller
{
    internal sealed class DamageModuleInstaller : IModuleInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration, IHostEnvironment environment)
        {
            // Register validators from Application assembly where commands are defined
            services.AddValidators(FireInsurance.Damage.Application.AssemblyReference.Assembly);

            services.AddDatabase(configuration);

            services.AddFileService(configuration, environment);
        }
    }
}
