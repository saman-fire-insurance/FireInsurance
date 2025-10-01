using FireInsurance.Users.Domain.Events.UserEvents;
using MediatR;
using Microsoft.Extensions.Logging;

namespace FireInsurance.Users.Application.EventHandlers
{
    public class VerificationCodeSentHandler(ILogger<VerificationCodeSentHandler> logger) : INotificationHandler<VerificationCodeSentDomainEvent>
    {
        public async Task Handle(VerificationCodeSentDomainEvent notification, CancellationToken cancellationToken)
        {
            try
            {
                logger.LogInformation("[VerificationCodeSentHandler] Event handled successfully.");
            }
            catch (Exception ex)
            {
                // Don't rethrow - we don't want SMS failure to fail registration
                logger.LogError(ex, "[VerificationCodeSentHandler] Event handled with failure. UserId = {UserId}", notification.UserId);
            }
        }
    }
}
