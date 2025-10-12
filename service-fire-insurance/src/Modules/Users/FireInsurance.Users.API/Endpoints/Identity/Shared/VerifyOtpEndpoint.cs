using Common.Abstraction.MinimalApi;
using Common.Extensions;
using FireInsurance.Users.Application.UseCases.Commands;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace FireInsurance.Users.API.Endpoints.Identity.Shared
{
    public class VerifyOtpEndpoint : IEndpoint
    {

        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/Users/VerifyOtp", VerifyOtpAsync)
              .WithTags(Tags.User_Authentication_Otp);
        }

        public static async Task<IResult> VerifyOtpAsync(OtpDto request, ISender sender, CancellationToken cancellationToken)
        {
            var command = new VerifyOtpCommand(request);
            var result = await sender.Send(command, cancellationToken);

            return result.ToActionResult();
        }
    }
}
