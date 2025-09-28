using Ardalis.Result;
using FireInsurance.Insurance.Application.Services;
using FireInsurance.Insurance.Domain.Entities;
using FireInsurance.Insurance.Domain.Errors;
using FireInsurance.Insurance.Domain.Events.UserEvents;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace FireInsurance.Insurance.Application.Identity.EventHandlers
{
    public class SendVerificationCodeHandler(ISmsService smsService, UserManager<User> userManager, ILogger<UserRegisteredSmsHandler> logger) : INotificationHandler<UserRegisteredDomainEvent>
    {
        public async Task Handle(SendVerificationCodeDomainEvent notification, CancellationToken cancellationToken)
        {
            try
            {
                logger.LogInformation("Sending welcome SMS to user {UserId} at {PhoneNumber}",
                    notification.UserId, notification.PhoneNumber);

                var code = await userManager.GenerateChangePhoneNumberTokenAsync(user.Id, user.PhoneNumber);
                if (!await smsService.SendCodeAsync(user.PhoneNumber, code))
                {
                    return Result.Error(UserErrors.Code.NotSent);
                }


                await smsService.SendCodeAsync(notification.PhoneNumber);

                logger.LogInformation("Welcome SMS sent successfully to user {UserId}", notification.UserId);
            }
            catch (Exception ex)
            {
                // Don't rethrow - we don't want SMS failure to fail registration
                logger.LogError(ex, "Failed to send welcome SMS to user {UserId}", notification.UserId);
            }
        }
    }
}
