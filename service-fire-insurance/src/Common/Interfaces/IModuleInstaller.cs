using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Common.Interfaces
{
    public interface IModuleInstaller
    {
        void Install(IServiceCollection services, IConfiguration configuration, IHostEnvironment environment);
    }
}
