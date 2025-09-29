using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System.Reflection;

namespace Common.Abstraction.MinimalApi;

public static class EndpointExtensions
{
    public static IServiceCollection AddEndpoints<TEndpoint>(this IServiceCollection services, params Assembly[] assemblies)
        where TEndpoint : IBaseEndpoint
    {
        var serviceDescriptors = assemblies
            .SelectMany(x => x.DefinedTypes)
            .Where(type => type is { IsAbstract: false, IsInterface: false } && type.IsAssignableTo(typeof(TEndpoint)))
            .Select(type => ServiceDescriptor.Transient(typeof(TEndpoint), type))
            .ToArray();

        services.TryAddEnumerable(serviceDescriptors);

        return services;
    }

    public static IApplicationBuilder MapEndpoints<TEndpoint>(this WebApplication app, RouteGroupBuilder routeGroupBuilder = null)
        where TEndpoint : IBaseEndpoint
    {
        var endpoints = app.Services.GetRequiredService<IEnumerable<TEndpoint>>();

        IEndpointRouteBuilder builder = routeGroupBuilder is null ? app : routeGroupBuilder;

        foreach (var endpoint in endpoints)
        {
            endpoint.MapEndpoint(builder);
        }

        return app;
    }
}
