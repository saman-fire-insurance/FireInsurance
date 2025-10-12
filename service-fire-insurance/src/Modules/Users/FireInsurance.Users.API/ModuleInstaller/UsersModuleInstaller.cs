using Common.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Common.Behaviors;
using FireInsurance.Users.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using FireInsurance.Users.Domain.Entities;
using FireInsurance.Users.Infrastructure.Services.Identity;
using FireInsurance.Users.Infrastructure.Services.Saman.Sms;
using FireInsurance.Users.Infrastructure.Services.Cache;

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

            services.AddSmsProvider(environment);
        }
    }
}
