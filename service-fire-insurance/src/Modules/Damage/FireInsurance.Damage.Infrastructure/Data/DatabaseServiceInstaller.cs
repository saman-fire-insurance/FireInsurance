using FireInsurance.Damage.Application.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace FireInsurance.Damage.Infrastructure.Data
{
    public static class DatabaseServiceInstaller
    {
        public static void AddDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("Database");

            if (string.IsNullOrWhiteSpace(connectionString))
            {
                return;
            }

            //services.AddScoped<AuditInterceptor>();

            services.AddDbContext<DamageDbContext>(/*(sp,*/ options/*)*/ =>
            {
                //var interceptor = sp.GetRequiredService<AuditInterceptor>();
                //options.AddInterceptors(interceptor);

                options
                .UseNpgsql(configuration.GetConnectionString("Database"), builder =>
                {
                    builder
                    .MigrationsHistoryTable(HistoryRepository.DefaultTableName, DamageDbContext.DB_SCHEMA)
                    .MigrationsAssembly(Assembly.GetExecutingAssembly().FullName)
                    .UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
                })
                .UseSnakeCaseNamingConvention();
            });

            services.AddDatabaseDeveloperPageExceptionFilter();

            services.AddScoped<IDamageDbContext>(sp => sp.GetRequiredService<DamageDbContext>());
            //GridifyGlobalConfiguration.EnableEntityFrameworkCompatibilityLayer();
        }
    }
}
