using Ardalis.Result;
using Common.Interfaces;
using Common.Messaging;
using FireInsurance.Users.Application.Dtos;
using FireInsurance.Users.Domain.Entities;
using FireInsurance.Users.Domain.Errors;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace FireInsurance.Users.Application.UseCases.Commands
{
    public sealed class UpdateUserProfileCommand(PersonInquiryRequest request) : ICommand<UserDto>
    {
        public string NationalCode { get; set; } = request.NationalCode;
        public string DateOfBirth { get; set; } = request.DateOfBirth;

        internal sealed class Validator : AbstractValidator<UpdateUserProfileCommand>
        {
            public Validator()
            {
                RuleFor(req => req.NationalCode)
                    .NotEmpty()
                    .WithMessage(UserErrors.NationalCode.Empty)
                    .Length(10)
                    .WithMessage(UserErrors.NationalCode.Invalid)
                    .Matches("^[0-9]+$")
                    .WithMessage(UserErrors.NationalCode.Invalid);

                RuleFor(req => req.DateOfBirth)
                    .NotEmpty()
                    .WithMessage(UserErrors.DateOfBirth.Empty)
                    .Length(10)
                    .WithMessage(UserErrors.DateOfBirth.Invalid)
                    .Matches(@"^\d{4}/\d{2}/\d{2}$")
                    .WithMessage(UserErrors.DateOfBirth.Invalid);
            }
        }

        internal sealed class Handler(
            UserManager<User> userManager,
            IClaimsProvider claimsProvider,
            IMediator mediator,
            ILogger<UpdateUserProfileCommand> logger) : ICommandHandler<UpdateUserProfileCommand, UserDto>
        {
            public async Task<Result<UserDto>> Handle(UpdateUserProfileCommand request, CancellationToken cancellationToken)
            {
                return Result.Success();
                //var userId = claimsProvider.UserId;
                //if (string.IsNullOrEmpty(userId))
                //{
                //    return Result.Unauthorized();
                //}

                //var user = await userManager.Users.FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
                //if (user is null)
                //{
                //    return Result.Error(UserErrors.NotFound());
                //}

                //logger.LogInformation("Updating profile for user {UserId}", userId);

                //// Update the user using the domain method
                //user.Update(request.FirstName, request.LastName, request.NationalID, request.DateOfBirth);

                //// Publish domain events
                //var domainEvents = user.GetDomainEvents();
                //logger.LogInformation("Processing {EventCount} domain events for user {UserId}", domainEvents.Count, userId);
                //foreach (var domainEvent in domainEvents)
                //{
                //    await mediator.Publish(domainEvent, cancellationToken);
                //}

                //user.ClearDomainEvents();

                //// Save changes
                //var updateResult = await userManager.UpdateAsync(user);
                //if (!updateResult.Succeeded)
                //{
                //    logger.LogError("Failed to update user {UserId}. Errors: {Errors}", 
                //        userId, string.Join(", ", updateResult.Errors.Select(e => e.Description)));
                //    return Result.Error("Failed to update user profile");
                //}

                //logger.LogInformation("Successfully updated profile for user {UserId}", userId);

                //// Return updated user data
                //return Result.Success(new UserDto(
                //    user.FirstName ?? string.Empty,
                //    user.LastName ?? string.Empty,
                //    user.NationalID,
                //    user.DateOfBirth));
            }
        }
    }
}
