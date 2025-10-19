using Common.Abstraction.MinimalApi;
using Common.Extensions;
using FireInsurance.Users.Application.UseCases.Commands;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace FireInsurance.Users.API.Endpoints.Identity.User
{
    internal sealed class UpdateUserProfileEndpoint //: IEndpoint
    {
        //public void MapEndpoint(IEndpointRouteBuilder app)
        //{
        //    app.MapPut("/Users/Profile", UpdateUserProfileAsync)
        //        .RequireAuthorization()
        //        .WithTags(Tags.User_Profile);
        //}

        //public static async Task<IResult> UpdateUserProfileAsync(UserDto request, ISender sender, CancellationToken cancellationToken)
        //{
        //    var command = new UpdateUserProfileCommand(request);
        //    var result = await sender.Send(command, cancellationToken);

        //    return result.ToActionResult();
        //}
    }
}
