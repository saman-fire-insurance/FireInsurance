//using Microsoft.AspNetCore.Builder;
//using Microsoft.AspNetCore.Diagnostics.HealthChecks;
//using Microsoft.AspNetCore.Http;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;
//using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Hosting;
//using Microsoft.Extensions.Logging;
//using OpenTelemetry;
//using OpenTelemetry.Logs;
//using OpenTelemetry.Metrics;
//using OpenTelemetry.Resources;
//using OpenTelemetry.Trace;
//using Prometheus;
//using Shila.ServiceDefaults.Monitoring;
//using System.Text.Json;

namespace Shila.ServiceDefaults;

public static partial class Extensions
{
    public static IHostApplicationBuilder AddServiceDefaults(this IHostApplicationBuilder builder, string serviceName = null, Type entryType = null)
    {
        //builder.AddBasicServiceDefaults(serviceName, entryType);

        //builder.Services.AddServiceDiscovery();

        //builder.Services.ConfigureHttpClientDefaults(http =>
        //{
        //    // Turn on resilience by default
        //    http.AddStandardResilienceHandler();

        //    // Turn on service discovery by default
        //    //http.UseServiceDiscovery();
        //});

        return builder;
    }

    /// <summary>
    /// Adds the services except for making outgoing HTTP calls.
    /// </summary>
    /// <remarks>
    /// This allows for things like Polly to be trimmed out of the app if it isn't used.
    /// </remarks>
    //public static IHostApplicationBuilder AddBasicServiceDefaults(this IHostApplicationBuilder builder, string serviceName, Type entryType)
    //{
    //    builder.AddDefaultHealthChecks();

    //    if (entryType is null or null)
    //    {
    //        return builder;
    //    }

    //    builder.ConfigureOpenTelemetry(serviceName, entryType);

    //    return builder;
    //}

    //public static IHostApplicationBuilder ConfigureOpenTelemetry(this IHostApplicationBuilder builder, string serviceName, Type entryType)
    //{
    //    builder.Services.AddOpenTelemetry()
    //        .WithTracing(tracerProviderBuilder =>
    //        {
    //            tracerProviderBuilder
    //                .AddAspNetCoreInstrumentation()
    //                .AddHttpClientInstrumentation()
    //                .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService(serviceName))
    //                .AddJaegerExporter(options =>
    //                {
    //                    options.AgentHost = builder.Configuration.GetValue<string>("Jaeger:Host");
    //                    options.AgentPort = builder.Configuration.GetValue<int>("Jaeger:Port");
    //                });
    //        })
    //        .WithMetrics()
    //        .WithLogging(loggingBuilder =>
    //        {
    //            loggingBuilder
    //                .SetResourceBuilder(
    //                    ResourceBuilder
    //                        .CreateDefault()
    //                        .AddService(
    //                            serviceName: serviceName,
    //                            serviceVersion: entryType.Assembly.GetName().Version?.ToString() ?? "unknown",
    //                            serviceInstanceId: Environment.MachineName));

    //            loggingBuilder.AddOtlpExporter(options =>
    //            {
    //                var openTelemetrySettings = builder.Configuration.GetSection(nameof(OpenTelemetrySettings)).Get<OpenTelemetrySettings>();
    //                options.Endpoint = new Uri(openTelemetrySettings.Endpoint);
    //            });
    //        });

    //    return builder;
    //}

    //private static IHostApplicationBuilder AddOpenTelemetryExporters(this IHostApplicationBuilder builder)
    //{
    //    var useOtlpExporter = !string.IsNullOrWhiteSpace(builder.Configuration["OTEL_EXPORTER_OTLP_ENDPOINT"]);

    //    if (useOtlpExporter)
    //    {
    //        builder.Services.Configure<OpenTelemetryLoggerOptions>(logging => logging.AddOtlpExporter());
    //        builder.Services.ConfigureOpenTelemetryMeterProvider(metrics => metrics.AddOtlpExporter());
    //        builder.Services.ConfigureOpenTelemetryTracerProvider(tracing => tracing.AddOtlpExporter());
    //    }

    //    // Configure alternative exporters
    //    builder.Services.AddOpenTelemetry()
    //                    .WithMetrics(metrics =>
    //                    {
    //                        // Uncomment the following line to enable the Prometheus endpoint
    //                        //metrics.AddPrometheusExporter();
    //                    });
    //    return builder;
    //}

    //private static MeterProviderBuilder AddBuiltInMeters(this MeterProviderBuilder meterProviderBuilder)
    //{
    //    return meterProviderBuilder.AddMeter("Microsoft.AspNetCore.Hosting",
    //                                         "Microsoft.AspNetCore.Server.Kestrel",
    //                                         "System.Net.Http");
    //}

    //public static IHostApplicationBuilder AddDefaultHealthChecks(this IHostApplicationBuilder builder)
    //{
    //    builder.Services.AddHealthChecks().AddCheck("self", () => HealthCheckResult.Healthy());
    //    return builder;
    //}

    //public static void StartMetricsServer(IConfiguration configuration)
    //{
    //    var prometheusPort = configuration.GetValue<int>("Prometheus:Port");

    //    var metricsServer = new KestrelMetricServer(port: prometheusPort);
    //    metricsServer.Start();

    //}

    //public static WebApplication MapDefaultEndpoints(this WebApplication app)
    //{
    //    // Mapping the health check endpoint
    //    app.MapHealthChecks("/health", new HealthCheckOptions
    //    {
    //        ResponseWriter = async (context, report) =>
    //        {
    //            context.Response.ContentType = "application/json";
    //            var result = JsonSerializer.Serialize(new
    //            {
    //                status = report.Status.ToString(),
    //                results = report.Entries.Select(e => new
    //                {
    //                    check = e.Key,
    //                    status = e.Value.Status.ToString(),
    //                    description = e.Value.Description,
    //                    data = e.Value.Data,
    //                    exception = e.Value.Exception?.Message
    //                })
    //            }, new JsonSerializerOptions { WriteIndented = true });
    //            await context.Response.WriteAsync(result);
    //        }
    //    });

    //    return app;
    //}
}