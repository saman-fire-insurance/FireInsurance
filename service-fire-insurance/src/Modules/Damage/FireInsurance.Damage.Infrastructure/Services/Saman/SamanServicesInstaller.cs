using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using System.Net;
using FireInsurance.Damage.Infrastructure.Services.Saman.ProxyServer;
using FireInsurance.Damage.Infrastructure.Services.Saman.SmsService;

namespace FireInsurance.Damage.Infrastructure.Services.Saman
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

            services.AddSmsProvider(environment);
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
