using FireInsurance.Users.Domain.Events.UserEvents;
using MediatR;
using Microsoft.Extensions.Logging;

namespace FireInsurance.Users.Application.EventHandlers
{
    public class UserProfileUpdatedHandler(ILogger<UserProfileUpdatedHandler> logger) 
        : INotificationHandler<UserProfileUpdatedDomainEvent>
    {
        public Task Handle(UserProfileUpdatedDomainEvent notification, CancellationToken cancellationToken)
        {
            logger.LogInformation("User profile updated for user {UserId}. Changed from '{OldFirstName} {OldLastName}' to '{NewFirstName} {NewLastName}'",
                notification.UserId,
                notification.OldFirstName,
                notification.OldLastName,
                notification.NewFirstName,
                notification.NewLastName);

            // Here you could add other logic like:
            // - Updating caches
            // - Sending notifications
            // - Triggering other business processes

            return Task.CompletedTask;
        }
    }
}
