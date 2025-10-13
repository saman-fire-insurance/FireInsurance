using Common.Abstraction.MinimalApi;
using Common.Extensions;
using FireInsurance.Damage.Application.UseCases.Commands;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using static FireInsurance.Damage.Application.UseCases.Commands.CreateDamageClaimCommand;

namespace FireInsurance.Damage.API.Endpoints
{
    internal class CreateDamageClaimEndpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/Users/RequestOtp", CreateDamageClaimAsync)
              .WithTags(Tags.User_Authentication_Otp);
        }

        public static async Task<IResult> CreateDamageClaimAsync(CreateDamageClaimRequest request, ISender sender, CancellationToken cancellationToken)
        {
            var command = new CreateDamageClaimCommand(request);
            var result = await sender.Send(command, cancellationToken);

            return result.ToActionResult();
        }
    }
}
