using FireInsurance.Users.Application.Services;
using FireInsurance.Users.Infrastructure.Services.Saman.Sms;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;

namespace FireInsurance.Users.Infrastructure.Services.Cache
{
    public static class UsersCacheInstaller
    {
        private static void AddRedisOptions(this IServiceCollection services)
        {
            services
                .AddOptions<RedisOptions>()
                .BindConfiguration(RedisOptionsSetup.SECTION_NAME)
                .ValidateDataAnnotations()
                .ValidateOnStart();

            services.TryAddSingleton(sp => sp.GetRequiredService<IOptions<RedisOptions>>().Value);
        }

        private static void AddRedisCache(this IServiceCollection services)
        {
            services.AddRedisOptions();

            var sp = services.BuildServiceProvider();
            var redisOptions = sp.GetRequiredService<RedisOptions>();

            services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = redisOptions.ConnectionString;
                options.InstanceName = redisOptions.InstanceName;
            });

            services.AddScoped<IUsersCachingService, UsersCachingService>();
        }

        public static void AddUsersCache(this IServiceCollection services)
        {
            services.AddRedisCache();
        }
    }
}
