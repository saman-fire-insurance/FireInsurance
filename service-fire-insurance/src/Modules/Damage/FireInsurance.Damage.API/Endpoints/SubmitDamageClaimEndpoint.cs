using Common.Abstraction.MinimalApi;
using Common.Extensions;
using FireInsurance.Damage.Application.UseCases.Commands;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace FireInsurance.Damage.API.Endpoints
{
    public sealed record SubmitDamageClaimRequest(Guid DamageClaimId);

    internal sealed class SubmitDamageClaimEndpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/DamageClaim/Submit", SubmitDamageClaimAsync)
                .RequireAuthorization()
                .WithTags(Tags.DamageClaim);
        }

        public static async Task<IResult> SubmitDamageClaimAsync(SubmitDamageClaimRequest request, ISender sender, CancellationToken cancellationToken)
        {
            var command = new SubmitDamageClaimCommand(request.DamageClaimId);
            var result = await sender.Send(command, cancellationToken);

            return result.ToActionResult();
        }
    }
}
