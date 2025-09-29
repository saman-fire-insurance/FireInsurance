using Common.Abstraction.MinimalApi;
using Microsoft.AspNetCore.Routing;
using System.Reflection;


namespace FireInsurance.Identity.API.Endpoints.Identity.User
{

public record LoginByCodeRequest(
    string PhoneNumber,
    long Code,
    string CaptchaToken);

public class SigninEndpoint : IEndpoint
{
    public void MapEndpoint(IRouteBuilder app)
    {
        throw new NotImplementedException();
    }
}

}
