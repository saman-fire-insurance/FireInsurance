using FireInsurance.Users.Contracts.ModuleServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;

namespace FireInsurance.Users.Application.Services.UsersModuleService
{
    public static class UsersModuleServiceInstaller
    {
        public static void AddUsersModuleService(this IServiceCollection services, IConfiguration configuration, IHostEnvironment env)
        {
            services.TryAddScoped<IUsersModuleService, UsersModuleService>();
        }
    }
}
