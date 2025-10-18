using Common.Abstraction.MinimalApi;
using FireInsurance.Users.Application.UseCases.Commands;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Common.Extensions;

namespace FireInsurance.Users.API.Endpoints.Identity.User
{
    internal sealed class VerifyPersonalIdentityEndpoint : IEndpoint
    {

        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/Users/VerifyIdentity", VerifyOtpAsync)
                .RequireAuthorization()
                .WithTags(Tags.User_Profile);
        }

        public static async Task<IResult> VerifyOtpAsync(PersonInquiryRequest request, ISender sender, CancellationToken cancellationToken)
        {
            var command = new VerifyPersonalIdentityCommand(request);
            var result = await sender.Send(command, cancellationToken);

            return result.ToActionResult();
        }
    }
}
