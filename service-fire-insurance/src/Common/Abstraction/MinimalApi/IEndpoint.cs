using Microsoft.AspNetCore.Routing;

namespace Common.Abstraction.MinimalApi;

public interface IBaseEndpoint
{
    void MapEndpoint(IEndpointRouteBuilder app);
}

public interface IEndpoint : IBaseEndpoint
{
}