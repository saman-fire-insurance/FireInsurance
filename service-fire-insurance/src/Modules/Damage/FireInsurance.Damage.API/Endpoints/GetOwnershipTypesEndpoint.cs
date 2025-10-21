using Common.Abstraction.MinimalApi;
using Common.Extensions;
using FireInsurance.Damage.Application.UseCases.Queries;
using Gridify;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace FireInsurance.Damage.API.Endpoints
{
    internal sealed class GetOwnershipTypesEndpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/DamageClaim/GetOwnershipTypes", GetOwnershipTypesAsync)
                //.RequireAuthorization()
                .WithTags(Tags.DamageClaim);
        }

        public static async Task<IResult> GetOwnershipTypesAsync(GridifyQuery request, ISender sender, CancellationToken cancellationToken)
        {
            var query = new GetOwnershipTypesQuery(request);
            var result = await sender.Send(query, cancellationToken);

            return result.ToActionResult();
        }
    }
}
