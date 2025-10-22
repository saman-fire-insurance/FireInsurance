using Common.Abstraction.MinimalApi;
using Common.Extensions;
using FireInsurance.Damage.Application.UseCases.Commands;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace FireInsurance.Damage.API.Endpoints
{
    internal sealed class AddStakeHoldersInfoToClaimEndpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/DamageClaim/AddStakeHolders", AddStakeHoldersAsync)
                .RequireAuthorization()
                .WithTags(Tags.DamageClaim);
        }

        public static async Task<IResult> AddStakeHoldersAsync(AddStakeHoldersInfoToClaimRequest request, ISender sender, CancellationToken cancellationToken)
        {
            var command = new AddStakeHoldersInfoToClaimCommand(request);
            var result = await sender.Send(command, cancellationToken);

            return result.ToActionResult();
        }
    }
}
