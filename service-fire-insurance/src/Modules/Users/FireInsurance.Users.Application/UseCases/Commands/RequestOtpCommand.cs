using Ardalis.Result;
using Common.Messaging;
using FireInsurance.Users.Application.Services;
using FireInsurance.Users.Domain.Entities;
using FireInsurance.Users.Domain.Errors;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.Data.Entity;

namespace FireInsurance.Users.Application.UseCases.Commands
{
    public record OtpRequest(string PhoneNumber/*, string CaptchaToken*/);

    public sealed class RequestOtpCommand(OtpRequest request) : ICommand
    {
        public string PhoneNumber { get; set; } = request.PhoneNumber;

        //public string CaptchaToken { get; set; } = request.CaptchaToken;

        internal sealed class Validator : AbstractValidator<RequestOtpCommand>
        {
            public Validator()
            {
                RuleFor(req => req.PhoneNumber)
                    .NotEmpty()
                    .WithMessage(UserErrors.PhoneNumber.Empty)
                    .Length(11)
                    .WithMessage(UserErrors.PhoneNumber.Invalid);

                //RuleFor(req => req.CaptchaToken)
                //    .NotEmpty()
                //    .WithMessage(UserErrors.ChaptchaToken.Empty);
            }
        }

        internal sealed class Handler(
            UserManager<Domain.Entities.User> userManager,
            IMediator _mediator,
            ISmsService smsService,
            //ICaptchaValidator captchaValidator,
            ILogger<RequestOtpCommand> logger) : ICommandHandler<RequestOtpCommand>
        {
            public async Task<Result> Handle(RequestOtpCommand request, CancellationToken cancellationToken)
            {
                //if (!(await captchaValidator.ValidateTokenAsync(request.CaptchaToken, CaptchaActions.SignUp)))
                //{
                //    return Result.Unauthorized();
                //}

                var user = await userManager.Users.FirstOrDefaultAsync(u => u.UserName == request.PhoneNumber, cancellationToken);
                // User is not created.
                if (user is null)
                {
                    // SignUp
                    var userResult = Domain.Entities.User.SignUp(request.PhoneNumber);
                    if (!userResult.IsSuccess)
                    {
                        logger.LogWarning("User registration failed validation for phone: {PhoneNumber}. Errors: {Errors}",
                            request.PhoneNumber, string.Join(", ", userResult.ValidationErrors.Select(e => e.ErrorMessage)));

                        return Result.Invalid(userResult.ValidationErrors);
                    }

                    user = userResult.Value;

                    if (!(await userManager.CreateAsync(user)).Succeeded)
                    {
                        return Result.Error(UserErrors.NotRegistered);
                    }
                }

                // Send code
                if (string.IsNullOrEmpty(user.PhoneNumber))
                {
                    logger.LogError($"User.PhoneNumber is null! user id: \"{user.PhoneNumber}\"");
                    return Result.Error(UserErrors.Code.NotSent);
                }

                if (!user.CanSendCode(3))
                {
                    return Result.Error(UserErrors.CodeSentRecently(3));
                }

                logger.LogInformation("Sending OTP to user {UserId} at {PhoneNumber}", user.Id, user.PhoneNumber);

                var code = await userManager.GenerateChangePhoneNumberTokenAsync(user, user.PhoneNumber);
                var sendCodeResult = await smsService.SendCodeAsync(user.PhoneNumber, code);
                if (!sendCodeResult.IsSuccess)
                {
                    return sendCodeResult;
                }

                logger.LogInformation("OTP sent successfully to user {UserId}", user.Id);

                user.SendCode();

                var domainEvents = user.GetDomainEvents();
                logger.LogInformation("Processing {EventCount} domain events for user {UserId}", domainEvents.Count, user.Id);

                // Publish domain events
                foreach (var domainEvent in domainEvents)
                {
                    await _mediator.Publish(domainEvent, cancellationToken);
                }

                user.ClearDomainEvents();

                return Result.Success();
            }
        }
    }
}
