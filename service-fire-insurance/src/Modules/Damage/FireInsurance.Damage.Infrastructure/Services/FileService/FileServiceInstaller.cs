using FireInsurance.Damage.Application.Services.FileService;
using FireInsurance.Damage.Infrastructure.Mocks.FileServiceMocks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;

namespace FireInsurance.Damage.Infrastructure.Services.FileService
{
    public static class FileServiceInstaller
    {
        public static void AddFileService(this IServiceCollection services, IConfiguration configuration, IHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                services.TryAddScoped<IFileContentTypeValidator, MockFileContentTypeValidator>();
                services.TryAddScoped<IFileService, MockFileService>();
            }
            else
            {
                services.TryAddScoped<IFileContentTypeValidator, MockFileContentTypeValidator>();
                services.TryAddScoped<IFileService, MockFileService>();
                //services.TryAddScoped<IFileService, FileService>();
                //services.TryAddScoped<IFileContentTypeValidator, FileContentTypeValidator>();
            }
        }
    }
}
