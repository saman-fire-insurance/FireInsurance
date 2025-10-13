using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace FireInsurance.Users.Infrastructure.Services.Saman
{
    internal sealed class SamanServicesOptionsSetup(IConfiguration configuration) : IConfigureOptions<SamanServicesOptions>
    {
        public const string SECTION_NAME = "SamanServices";

        public void Configure(SamanServicesOptions options)
        {
            configuration.GetSection(SECTION_NAME).Bind(options);
        }
    }
}