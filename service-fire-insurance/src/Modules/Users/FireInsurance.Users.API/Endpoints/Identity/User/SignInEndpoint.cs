using Common.Abstraction.MinimalApi;
using Microsoft.AspNetCore.Routing;


namespace FireInsurance.Users.API.Endpoints.Identity.User
{

    public record LoginByCodeRequest(
        string PhoneNumber,
        long Code,
        string CaptchaToken);

    public class SigninEndpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            //throw new NotImplementedException();
        }
    }
     
}
