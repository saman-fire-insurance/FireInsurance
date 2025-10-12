using Common.Abstraction.MinimalApi;
using Common.Extensions;
using FireInsurance.Users.Application.UseCases.Commands;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace FireInsurance.Users.API.Endpoints.Identity.Shared
{
    public class RequestOtpEndpoint : IEndpoint
    {

        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/Users/RequestOtp", RequestOtpAsync)
              .WithTags(Tags.User_Authentication_Otp);
        }

        public static async Task<IResult> RequestOtpAsync(OtpRequestDto request, ISender sender, CancellationToken cancellationToken)
        {
            var command = new RequestOtpCommand(request);
            var result = await sender.Send(command, cancellationToken);

            return result.ToActionResult();
        }
    }
}
