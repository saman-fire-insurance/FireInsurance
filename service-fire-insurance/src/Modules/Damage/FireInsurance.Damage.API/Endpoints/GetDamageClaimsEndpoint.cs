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
    internal sealed class GetDamageClaimsEndpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapGet("/DamageClaim", GetDamageClaimsAsync)
                .RequireAuthorization()
                .WithTags(Tags.DamageClaim);
        }

        public static async Task<IResult> GetDamageClaimsAsync([AsParameters] GridifyQuery gridifyQuery, ISender sender, CancellationToken cancellationToken)
        {
            var query = new GetDamageClaimsQuery(gridifyQuery);
            var result = await sender.Send(query, cancellationToken);

            return result.ToActionResult();
        }
    }
}
