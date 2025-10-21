using FireInsurance.Users.Application.Services;
using FireInsurance.Users.Infrastructure.Services.Saman.Sms;
using FireInsurance.Users.Infrastructure.Mocks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
//using PetInsurancePlatform.Insurance.Infrastructure.ProxyServer;
//using PetInsurancePlatform.SharedKernel.Notification;
//using PetInsurancePlatform.Users.Infrastructure.Notification.SmsProvider;
using Refit;
using System.Net;


namespace FireInsurance.Users.Infrastructure.Services.Saman.Sms
{
    public static class SmsServiceInstaller
    {
        private static void AddSmsProviderOptions(this IServiceCollection services)
        {
            services
                .AddOptions<SmsProviderOptions>()
                .BindConfiguration(SmsProviderOptionsSetup.SECTION_NAME)
                .ValidateDataAnnotations()
                .ValidateOnStart(); 

            services.TryAddSingleton(sp => sp.GetRequiredService<IOptions<SmsProviderOptions>>().Value);
        }

        //private static void AddRedisOptions(this IServiceCollection services)
        //{
        //    services
        //        .AddOptions<RedisOptions>()
        //        .BindConfiguration(RedisOptionsSetup.SECTION_NAME)
        //        .ValidateDataAnnotations()
        //        .ValidateOnStart();

        //    services.TryAddSingleton(sp => sp.GetRequiredService<IOptions<RedisOptions>>().Value);
        //}

        //private static void AddRedisCache(this IServiceCollection services)
        //{
        //    services.AddRedisOptions();

        //    services.AddStackExchangeRedisCache(options =>
        //    {
        //        var redisOptions = services.BuildServiceProvider().GetRequiredService<RedisOptions>();
        //        options.Configuration = redisOptions.ConnectionString;
        //        options.InstanceName = redisOptions.InstanceName;
        //    });

        //    services.AddScoped<ISmsTokenCache, RedisSmsTokenCache>();
        //}

        public static void AddSmsProvider(
            this IServiceCollection services,
            IHostEnvironment environment)
        {
            if (environment.IsDevelopment())
            {
                services.AddScoped<ISmsService, MockSmsService>();
                //services.AddScoped<ISmsSender, SmsSender>();
            }
            else
            {
                //services.AddScoped<ISmsService, SmsService>();
                services.AddScoped<ISmsService, MockSmsService>();
            }

            services.AddSmsProviderOptions();
            //services.AddRedisCache();

            var sp = services.BuildServiceProvider();

            //var smsProviderOptions = sp.GetRequiredService<SmsProviderOptions>();

            //var proxyOptions = sp.GetRequiredService<ProxyOptions>();

            //// Production sms services
            //services
            //   .AddRefitClient<ISmsAuthApi>()
            //   .ConfigureHttpClient((sp, httpClient) =>
            //   {
            //       httpClient.BaseAddress = new Uri(smsProviderOptions.BaseUrl);
            //       httpClient.Timeout = TimeSpan.FromSeconds(30);
            //   })
            //   .ConfigurePrimaryHttpMessageHandler(() => CreateHttpMessageHandler(proxyOptions));

            //services
            //    .AddRefitClient<ISmsProviderApi>()
            //    .ConfigureHttpClient((sp, httpClient) =>
            //    {
            //        httpClient.BaseAddress = new Uri(smsProviderOptions.BaseUrl);
            //        httpClient.Timeout = TimeSpan.FromSeconds(30);
            //    })
            //    .ConfigurePrimaryHttpMessageHandler(() => CreateHttpMessageHandler(proxyOptions))
            //    .AddHttpMessageHandler<SmsAuthHandler>();

            //services.TryAddTransient<SmsAuthHandler>();
        }

        //private static HttpClientHandler CreateHttpMessageHandler(ProxyOptions options)
        //{
        //    var handler = new HttpClientHandler();

        //    var proxyAddress = options.Address;
        //    var proxyWebProxy = new WebProxy(proxyAddress);

        //    if (!string.IsNullOrEmpty(options.Users) && !string.IsNullOrEmpty(options.Password))
        //    {
        //        proxyWebProxy.Credentials = new NetworkCredential(
        //            options.Users,
        //            options.Password);
        //    }

        //    handler.Proxy = proxyWebProxy;
        //    handler.UseProxy = true;

        //    return handler;
        //}
    }

}
