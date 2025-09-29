using Common.Abstraction.MinimalApi;
using Common.Extensions;
using FireInsurance.Identity.Application.UseCases.Commands;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace FireInsurance.Identity.API.Endpoints.Identity.Shared
{
    public class RequestOtpEndpoint : IEndpoint
    {

        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/Identity/RequestOtp", RequestOtpAsync)
              .WithTags(Tags.Identity_Otp_Request);
        }

        public static async Task<IResult> RequestOtpAsync(OtpRequest request, ISender sender, CancellationToken cancellationToken)
        {
            var command = new RequestOtpCommand(request);
            var result = await sender.Send(command, cancellationToken);

            return result.ToActionResult();
        }
    }
}
