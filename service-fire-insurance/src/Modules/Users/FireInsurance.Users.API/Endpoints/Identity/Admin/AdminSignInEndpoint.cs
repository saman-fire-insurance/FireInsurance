using Ardalis.Result;
using Common.Abstraction.MinimalApi;
using MediatR;
using Microsoft.AspNetCore.Routing;

namespace FireInsurance.Users.API.Endpoints.Identity.Admin
{
    public class AdminSignInEndpoint //: IEndpoint
    {
        //    public void MapEndpoint(IRouteBuilder app)
        //    {
        //        app.MapPost("/Users/Admin/SignIn", SignInAdminAsync)
        //          .WithTags(Tags.Identity_Admin);
        //    }

        //    public static async Task<IResult> SignInAdminAsync(SignInAdminCommand command, ISender sender, CancellationToken cancellationToken)
        //    {
        //        var result = await sender.Send(command, cancellationToken);
        //        if (result != null && result.IsSuccess)
        //        {
        //            return TypedResults.Ok(result.Value);
        //        }

        //        return TypedResults.NotFound();
        //    }
    }
}
