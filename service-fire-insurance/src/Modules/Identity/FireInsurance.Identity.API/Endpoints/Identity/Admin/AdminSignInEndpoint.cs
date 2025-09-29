using Ardalis.Result;
using Common.Abstraction.MinimalApi;
using Microsoft.AspNetCore.Routing;

namespace FireInsurance.Identity.API.Endpoints.Identity.Admin
{
    public class AdminSignInEndpoint : IEndpoint
    {
        public void MapEndpoint(IRouteBuilder app)
        {
            //app.MapPost("/Identity/Admin/SignIn", SignInAdminAsync)
            //  .WithTags(Tags.Identity_Admin);
        }

        //public static async Task<IResult> SignInAdminAsync(UpdateBasketsCommand command, ISender sender, CancellationToken cancellationToken)
        //{
        //    var result = await sender.Send(command, cancellationToken);
        //    if (result != null && result.IsSuccess)
        //    {
        //        return TypedResults.Ok(result.Value);
        //    }

        //    return TypedResults.NotFound();
        //}
    }
}
