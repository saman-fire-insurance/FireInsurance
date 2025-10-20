using Common.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Common.Behaviors;
using FireInsurance.Users.Infrastructure.Services.Identity;
using FireInsurance.Users.Infrastructure.Services.Cache;
using FireInsurance.Users.Infrastructure.Services.Saman;
using FireInsurance.Users.Infrastructure.Services.ProxyServer;
using FireInsurance.Users.Infrastructure.Data;
using FireInsurance.Users.Application.Services.UsersModuleService;

namespace FireInsurance.Users.API.ModuleInstaller
{
    internal sealed class UsersModuleInstaller : IModuleInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration, IHostEnvironment environment)
        {
            services.AddValidators(AssemblyReference.Assembly);

            services.AddDatabase(configuration);

            services.AddUsersCache();

            services.AddIdentityProvider(environment);

            services.AddJwtAuthentication();

            services.AddProxyServer();

            services.AddSamanServices(environment);

            // ModuleServices for inter-module communication
            services.AddUsersModuleService(configuration, environment);
        }
    }
}
