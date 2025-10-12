using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace FireInsurance.Users.Infrastructure.Services.Identity;

internal sealed class JwtOptionsSetup(IConfiguration configuration) : IConfigureOptions<JwtOptions>
{
    public const string SECTION_NAME = "Jwt";

    public void Configure(JwtOptions options)
    {
        configuration
            .GetSection(SECTION_NAME)
            .Bind(options);
    }
}
