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
    internal class GetProvincesEndpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/Province/GetProvinces", GetProvincesAsync)
                //.RequireAuthorization()
                .WithTags(Tags.City);
        }

        public static async Task<IResult> GetProvincesAsync(GridifyQuery request, ISender sender, CancellationToken cancellationToken)
        {
            var query = new GetProvincesQuery(request);
            var result = await sender.Send(query, cancellationToken);

            return result.ToActionResult();
        }
    }
}
