using Common.Abstraction.MinimalApi;
using FireInsurance.Damage.Application.UseCases.Commands;
using MediatR;
using Common.Extensions;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace FireInsurance.Damage.API.Endpoints
{
    internal sealed class CreateDamageClaimEndpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/DamageClaim/Create", CreateDamageClaimAsync)
                .RequireAuthorization()
                .WithTags(Tags.DamageClaim);
        }

        public static async Task<IResult> CreateDamageClaimAsync(CreateDamageClaimRequest request, ISender sender, CancellationToken cancellationToken)
        {
            var command = new CreateDamageClaimCommand(request);
            var result = await sender.Send(command, cancellationToken);

            return result.ToActionResult();
        }
    }
}
