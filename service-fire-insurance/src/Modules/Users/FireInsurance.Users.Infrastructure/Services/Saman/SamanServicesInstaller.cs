using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using FireInsurance.Users.Application.Services;
using FireInsurance.Users.Infrastructure.Services.Saman.PersonInquiry;
using System.Net;
using FireInsurance.Users.Infrastructure.Services.Saman.Sms;
using FireInsurance.Users.Infrastructure.Services.ProxyServer;
using Refit;
using System;

namespace FireInsurance.Users.Infrastructure.Services.Saman
{
    public static class SamanServicesInstaller
    {
        private static void AddSamanServicesOptions(this IServiceCollection services)
        {
            services
                .AddOptions<SamanServicesOptions>()
                .BindConfiguration(SamanServicesOptionsSetup.SECTION_NAME)
                .ValidateDataAnnotations()
                .ValidateOnStart();

            services.TryAddSingleton(sp => sp.GetRequiredService<IOptions<SamanServicesOptions>>().Value);
        }

        //public static void AddFakePersonInquiryService(this IServiceCollection services)
        //{
        //    services.AddScoped<IPersonInquiryService, FakePersonInquiryService>();
        //}

        public static void AddSamanServices(this IServiceCollection services, IHostEnvironment environment)
        {
            services.AddSamanServicesOptions();

            var sp = services.BuildServiceProvider();
            var samanServicesOptions = sp.GetRequiredService<SamanServicesOptions>();
            var proxyOptions = sp.GetRequiredService<ProxyOptions>();

            services.AddPersonInquiryService(environment, samanServicesOptions, proxyOptions);

            services.AddSmsProvider(environment);
        }

        public static void AddPersonInquiryService(this IServiceCollection services, IHostEnvironment environment, SamanServicesOptions samanServicesOptions, ProxyOptions proxyOptions)
        {
            services.AddScoped<IPersonInquiryService, PersonInquiryService>();

            if (environment.IsDevelopment())
            {
                services.AddScoped<IPersonInquiryService, PersonInquiryService>();
                //services.AddScoped<ISmsSender, FakeSmsSender>();
            }
            else
            {
                services.AddScoped<IPersonInquiryService, PersonInquiryService>();
            }
            services
                .AddRefitClient<IPersonInquiryApi>()
                .ConfigureHttpClient((sp, httpClient) =>
                {
                    httpClient.BaseAddress = new Uri(samanServicesOptions.BaseUrl);
                    httpClient.Timeout = TimeSpan.FromSeconds(30);
                })
                .ConfigurePrimaryHttpMessageHandler(() => CreateHttpMessageHandler(proxyOptions))
                .AddHttpMessageHandler<SamanServiceHandler>();

            services.TryAddScoped<SamanServiceHandler>();
        }

        private static HttpClientHandler CreateHttpMessageHandler(ProxyOptions options)
        {
            var handler = new HttpClientHandler();

            var proxyAddress = options.Address;
            var proxyWebProxy = new WebProxy(proxyAddress);

            if (!string.IsNullOrEmpty(options.User) && !string.IsNullOrEmpty(options.Password))
            {
                proxyWebProxy.Credentials = new NetworkCredential(
                    options.User,
                    options.Password);
            }

            handler.Proxy = proxyWebProxy;
            handler.UseProxy = true;

            return handler;
        }
    }
    
}
