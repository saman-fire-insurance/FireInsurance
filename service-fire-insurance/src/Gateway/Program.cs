using FireInsurance.Identity;
//using FireInsurance.App.Queue;
//using FireInsurance.Insurance.Endpoints.ModuleInstaller;
//using FireInsurance.SharedKernel.Behaviors;
//using FireInsurance.SharedKernel.Extensions;
//using FireInsurance.SharedKernel.HealthChecks;
//using FireInsurance.SharedKernel.Monitoring;
using FireInsurance.Identity.API.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.InstallModules(
    builder.Configuration,
    builder.Environment,
    InsuranceModule.Assembly,
    UsersModule.Assembly);

