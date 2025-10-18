using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace FireInsurance.Users.Application.Services.ServiceInstallers
{
    internal class UsersModuleServiceInstaller : IServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration, IHostEnvironment env)
        {
            services.TryAddScoped<IBasketModuleService, BasketModuleService>();
        }
    }
}
