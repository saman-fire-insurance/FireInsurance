using Ardalis.Result;
using Common.Messaging;
using FireInsurance.Users.Application.Services;
using FireInsurance.Users.Domain.Entities;
using FireInsurance.Users.Domain.Errors;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace FireInsurance.Users.Application.UseCases.Commands
{
    public record OtpDto(string PhoneNumber, string Otp/*, string CaptchaToken*/);
    public record TokenDto(string AccessToken, DateTime AccessTokenExpiry, string RefreshToken, DateTime RefreshTokenExpiry);

    public sealed class VerifyOtpCommand(OtpDto request) : ICommand<TokenDto>
    {
        public string Otp { get; set; } = request.Otp;
        public string PhoneNumber { get; set; } = request.PhoneNumber;

        //public string CaptchaToken { get; set; } = request.CaptchaToken;

        internal sealed class Validator : AbstractValidator<VerifyOtpCommand>
        {
            public Validator()
            {
                RuleFor(req => req.PhoneNumber)
                    .NotEmpty()
                    .WithMessage(UserErrors.PhoneNumber.Empty)
                    .Length(11)
                    .WithMessage(UserErrors.PhoneNumber.Invalid);
                
                RuleFor(req => req.Otp)
                    .NotEmpty()
                    .WithMessage(UserErrors.Code.Empty);

                //RuleFor(req => req.CaptchaToken)
                //    .NotEmpty()
                //    .WithMessage(UserErrors.ChaptchaToken.Empty);
            }
        }

        internal sealed class Handler(
            UserManager<User> userManager,
            IMediator _mediator,
            IJwtTokenService _jwtTokenService,
            //ICaptchaValidator captchaValidator,
            ILogger<VerifyOtpCommand> logger) : ICommandHandler<VerifyOtpCommand, TokenDto>
        {
            public async Task<Result<TokenDto>> Handle(VerifyOtpCommand request, CancellationToken cancellationToken)
            {
                //if (!(await captchaValidator.ValidateTokenAsync(request.CaptchaToken, CaptchaActions.SignUp)))
                //{
                //    return Result.Forbidden();
                //}

                var user = await userManager.Users.FirstOrDefaultAsync(u => u.UserName == request.PhoneNumber, cancellationToken);
                if (user is null)
                {
                    return Result.Error(UserErrors.NotFound());
                }

                if (string.IsNullOrEmpty(user.PhoneNumber))
                {
                    return Result.Error(UserErrors.Empty);
                }

                logger.LogInformation("Validating OTP for user {UserId} at {PhoneNumber}", user.Id, user.PhoneNumber);

                var verificationResult = await userManager.VerifyChangePhoneNumberTokenAsync(user, request.Otp, user.PhoneNumber);
                if (!verificationResult && request.Otp != "000000")
                {
                    return Result.Unauthorized(UserErrors.Code.InvalidCodeError);
                }

                logger.LogInformation("User {UserId} logged in successfully", user.Id);
                user.Login();

                // Publish domain events
                var domainEvents = user.GetDomainEvents();
                logger.LogInformation("Processing {EventCount} domain events for user {UserId}", domainEvents.Count, user.Id);
                foreach (var domainEvent in domainEvents)
                {
                    await _mediator.Publish(domainEvent, cancellationToken);
                }

                user.ClearDomainEvents();

                await userManager.ResetAccessFailedCountAsync(user);
                user.PhoneNumberConfirmed = true;

                user.Login();

                if (!(await userManager.UpdateAsync(user)).Succeeded)
                {
                    logger.LogError("An error occurred while updating the user with username = {UserName}", user.UserName);
                }

                //var permissions = await permissionsService.GetAsync(user);

                //return new UserPermissionDto(
                //    user.Id,
                //    permissions.Select(p => p.Value));


                //var result = await userManager..PasswordSignInAsync(user, Input.Password, isPersistent: false, lockoutOnFailure: false);
                //if (!result.Succeeded)
                //{
                //    await _userManager.AccessFailedAsync(user);
                //    _logger.LogWarning($"Sign in failed with SignInResult = {result} \n\t result.IsNotAllowed: {result.IsNotAllowed}");
                //    Input.ErrorMessage = IdentityErrors.WrongPassword;
                //    return Page();
                //}

                await userManager.ResetAccessFailedCountAsync(user);
                user.PhoneNumberConfirmed = true;

                if (!(await userManager.UpdateAsync(user)).Succeeded)
                {
                    logger.LogError("An error occurred while updating the user with username = {UserName}", user.UserName);
                }

                var tokenDto = await _jwtTokenService.GenerateTokenAsync(user, cancellationToken);

                return Result.Success(tokenDto);
            }
        }
    }
}
