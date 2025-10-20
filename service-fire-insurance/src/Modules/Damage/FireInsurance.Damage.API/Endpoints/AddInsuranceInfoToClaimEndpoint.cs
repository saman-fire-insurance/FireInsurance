using Common.Abstraction.MinimalApi;
using Common.Extensions;
using FireInsurance.Damage.Application.UseCases.Commands;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace FireInsurance.Damage.API.Endpoints
{
    internal sealed class AddInsuranceInfoToClaimEndpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/DamageClaim/AddInsurance", CreateDamageClaimAsync)
                .RequireAuthorization()
                .WithTags(Tags.DamageClaim);
        }

        public static async Task<IResult> CreateDamageClaimAsync(AddInsuranceInfoToClaimRequest request, ISender sender, CancellationToken cancellationToken)
        {
            var command = new AddInsuranceInfoToClaimCommand(request);
            var result = await sender.Send(command, cancellationToken);

            return result.ToActionResult();
        }
    }

}
