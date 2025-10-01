using FireInsurance.Users.Domain.Entities;
using FireInsurance.Users.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace FireInsurance.Users.Infrastructure.Services.Identity
{
    public static class IdentityServiceInstaller
    {
        public static void AddIdentityProvider(this IServiceCollection services, IHostEnvironment environment)
        {
            var builder = services.AddIdentityCore<User>(ConfigureIdentityOptions);

            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), services);

            builder
                .AddEntityFrameworkStores<UsersDbContext>()
                .AddDefaultTokenProviders()
                .AddUserManager<UserManager<User>>()
                .AddRoleManager<RoleManager<IdentityRole>>();
        }
        private static void ConfigureIdentityOptions(IdentityOptions options)
        {
            options.SignIn.RequireConfirmedAccount = true;
            options.SignIn.RequireConfirmedPhoneNumber = true;
            options.SignIn.RequireConfirmedEmail = false;

            options.Password.RequireDigit = false;
            options.Password.RequiredLength = 6;
            options.Password.RequiredUniqueChars = 0;
            options.Password.RequireLowercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;

            options.Lockout.AllowedForNewUsers = true;
            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
            options.Lockout.MaxFailedAccessAttempts = 5;
        }
    }
}
