using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Shila.ServiceDefaults.Abstractions.ServiceInstaller;

public interface IServiceInstaller
{
    void Install(IServiceCollection services, IConfiguration configuration, IHostEnvironment env);
}
