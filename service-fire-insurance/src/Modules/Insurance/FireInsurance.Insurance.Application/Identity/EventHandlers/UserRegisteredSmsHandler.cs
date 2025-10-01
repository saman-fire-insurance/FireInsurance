using FireInsurance.Insurance.Application.Services;
using FireInsurance.Insurance.Domain.Events.UserEvents;
using MediatR;
using Microsoft.Extensions.Logging;

namespace FireInsurance.Insurance.Application.Identity.EventHandlers
{
    public class UserRegisteredSmsHandler : INotificationHandler<UserRegisteredDomainEvent>
    {
        private readonly ISmsService _smsService;
        private readonly ILogger<UserRegisteredSmsHandler> _logger;

        public UserRegisteredSmsHandler(ISmsService smsService, ILogger<UserRegisteredSmsHandler> logger)
        {
            _smsService = smsService;
            _logger = logger;
        }

        public async Task Handle(UserRegisteredDomainEvent notification, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation("Sending welcome SMS to user {UserId} at {PhoneNumber}",
                    notification.UserId, notification.PhoneNumber);

                //await _smsService.SendWelcomeMessage(notification.PhoneNumber);

                _logger.LogInformation("Welcome SMS sent successfully to user {UserId}", notification.UserId);
            }
            catch (Exception ex)
            {
                // Don't rethrow - we don't want SMS failure to fail registration
                _logger.LogError(ex, "Failed to send welcome SMS to user {UserId}", notification.UserId);
            }
        }
    }
}
