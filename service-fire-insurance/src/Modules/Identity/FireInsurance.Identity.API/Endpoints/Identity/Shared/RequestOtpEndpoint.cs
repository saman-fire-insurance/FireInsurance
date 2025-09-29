using Common.Abstraction.MinimalApi;
using Microsoft.Extensions.Logging;
using FireInsurance.Identity.Application.UseCases.Commands;

namespace FireInsurance.Identity.API.Endpoints.Identity.Shared
{
    public class RequestOtpEndpoint(
        SignUpRequest request,
        IMediator mediator,
        ILogger<Program> logger,
        CancellationToken cancellationToken) : IEndpoint
    {
        logger.LogInformation("SignUp endpoint called for phone: {PhoneNumber}", request.PhoneNumber);

        var command = new RequestOtpCommand(request.PhoneNumber);
        var result = await mediator.Send(command, cancellationToken);

        return result.ToActionResult();
    }
}
