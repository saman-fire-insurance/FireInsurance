using Common.Abstraction.MinimalApi;
using Common.Extensions;
using FireInsurance.Damage.Application.UseCases.Queries;
using Gridify;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace FireInsurance.Damage.API.Endpoints.Cities
{
    public sealed record GetCitiesRequest(Guid ProvinceId, GridifyQuery Query);

    internal class GetCitiesEndpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/City/GetCities", GetCitiesAsync)
                //.RequireAuthorization()
                .WithTags(Tags.City);
        }

        public static async Task<IResult> GetCitiesAsync(GetCitiesRequest request, ISender sender, CancellationToken cancellationToken)
        {
            var query = new GetCitiesQuery(request.ProvinceId, request.Query);
            var result = await sender.Send(query, cancellationToken);

            return result.ToActionResult();
        }
    }
}
