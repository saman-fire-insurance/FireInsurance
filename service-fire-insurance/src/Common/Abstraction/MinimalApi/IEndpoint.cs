using Microsoft.AspNetCore.Routing;

namespace Common.Abstraction.MinimalApi;

public interface IBaseEndpoint
{
    void MapEndpoint(IRouteBuilder app);
}

public interface IEndpoint : IBaseEndpoint
{
}