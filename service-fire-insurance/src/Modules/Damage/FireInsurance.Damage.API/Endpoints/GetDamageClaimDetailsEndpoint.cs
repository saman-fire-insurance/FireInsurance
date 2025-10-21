using Common.Abstraction.MinimalApi;
using Common.Extensions;
using FireInsurance.Damage.Application.UseCases.Queries;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace FireInsurance.Damage.API.Endpoints
{
    internal sealed class GetDamageClaimDetailsEndpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/DamageClaim/GetClaim", GetDamageClaimAsync)
                .RequireAuthorization()
                .WithTags(Tags.DamageClaim);
        }

        public static async Task<IResult> GetDamageClaimAsync(GetDamageClaimDetailsRequest request, ISender sender, CancellationToken cancellationToken)
        {
            var query = new GetDamageClaimDetailsQuery(request);
            var result = await sender.Send(query, cancellationToken);

            return result.ToActionResult();
        }
    }
}
