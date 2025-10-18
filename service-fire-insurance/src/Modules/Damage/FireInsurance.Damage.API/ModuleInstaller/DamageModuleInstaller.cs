using Common.Behaviors;
using Common.Interfaces;
using FireInsurance.Damage.Infrastructure.Data;
using FireInsurance.Users.Contracts.ModuleServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace FireInsurance.Damage.API.ModuleInstaller
{
    internal sealed class DamageModuleInstaller : IModuleInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration, IHostEnvironment environment)
        {
            services.AddValidators(AssemblyReference.Assembly);

            services.AddDatabase(configuration);

            //services.AddScoped<IUsersModuleService>();
        }
    }
}
