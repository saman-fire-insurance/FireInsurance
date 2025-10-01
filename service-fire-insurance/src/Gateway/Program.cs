using Mapster;
using Common.Extensions;
using Common.Installers;
//using FireInsurance.App.Queue;
//using FireInsurance.Insurance.Endpoints.ModuleInstaller;
//using FireInsurance.SharedKernel.Behaviors;
//using FireInsurance.SharedKernel.Extensions;
//using FireInsurance.SharedKernel.HealthChecks;
//using FireInsurance.SharedKernel.Monitoring;
using FireInsurance.Users.API.ModuleInstaller;
using Common.Behaviors;
using Gridify;
using Common.Abstraction.MinimalApi;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

builder.AddDefaultOpenApi();
builder.AddDefaultOpenApi();

builder.Services.AddAuthorization();

builder.Services.InstallModules(
    builder.Configuration,
    builder.Environment,
    UsersModule.Assembly);


builder.Services.AddMediatR(config => config.RegisterServicesFromAssemblies(
    [
        //.. InsuranceModule.Assemblies,
        .. UsersModule.Assemblies
    ]));


builder.Services.AddLoggingBehavior();
builder.Services.AddValidationBehavior();

GridifyGlobalConfiguration.DefaultDateTimeKind = DateTimeKind.Utc;

const string corsName = "SAMAN_CORS_POLICY";

string[] localUrls =
[
    "http://localhost:3000"
];

string[] stageUrls =
[
];

string[] productionUrls =
[
];

string[] remoteUrls = [.. localUrls, .. stageUrls, .. productionUrls];

builder.Services.AddCors(options =>
{
    options.AddPolicy(corsName, builder =>
    {
        builder
        .WithOrigins(remoteUrls)
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

builder.Services.AddHttpClient();

builder.Services.AddEndpoints<IEndpoint>(
    //InsuranceModule.Assembly,
    UsersModule.Assembly
    );

var forwardedHeaderOptions = new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
};
forwardedHeaderOptions.KnownNetworks.Clear();
forwardedHeaderOptions.KnownProxies.Clear();

//builder.Services.AddRazorPages();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors(corsName);

app
    //.UseJwtRevocation<JwtBlackListValidator>()
    .UseAuthentication()
    .UseAuthorization();

app.UseDefaultOpenApi();

    //.UseFastEndpoints(config =>
    //{
    //    config.Endpoints.RoutePrefix = "api";
    //    //config.Throttle.HeaderName = "X-Client-ID";
    //    config.Throttle.Message = "تعداد درخواست های شما بیش از حد مجاز است.";
    //})

var logger = app.Services.GetRequiredService<ILogger<Program>>();
logger.LogInformation("Current Environment: {env}", builder.Environment.EnvironmentName);
Console.WriteLine($"ASPNETCORE_ENVIRONMENT = {Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}");
Console.WriteLine($"DOTNET_ENVIRONMENT = {Environment.GetEnvironmentVariable("DOTNET_ENVIRONMENT")}");
Console.WriteLine($"IHostEnvironment.EnvironmentName = {builder.Environment.EnvironmentName}");

app.UseDeveloperExceptionPage();

app.UseForwardedHeaders();

app.UseDefaultOpenApi();

//app.Use(async (context, next) =>
//{
//    context.Response.Headers.XFrameOptions = "DENY";

//    context.Response.Headers.XContentTypeOptions = "nosniff";

//    context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");

//    await next();
//});


app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

//app.UseExceptionHandler();

var routeGroup = app.MapGroup("api/v1");

app.MapEndpoints<IEndpoint>(routeGroup);

//app.MapRazorPages();

app.Run();

if (app.Environment.IsDevelopment())
{
//app.ApplyInsuranceDatabaseMigrations();

//app.ApplyUsersDatabaseMigrations();
}

app.MapRazorPages();

app.Run();

/// <summary>
/// Needed for tests.
/// DO NOT DELETE!
/// </summary>
public partial class Program
{
}