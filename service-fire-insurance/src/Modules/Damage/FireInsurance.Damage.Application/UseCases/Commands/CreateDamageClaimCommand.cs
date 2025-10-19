using Ardalis.Result;
using Common.Interfaces;
using Common.Messaging;
using FireInsurance.Damage.Application.Data;
using FireInsurance.Damage.Domain.Entities;
using FireInsurance.Users.Contracts.ModuleServices;
using FluentValidation;

namespace FireInsurance.Damage.Application.UseCases.Commands
{
    public sealed record CreateDamageClaimRequest(string PhoneNumber);

    public class CreateDamageClaimCommand(CreateDamageClaimRequest request) : ICommand<Guid>
    {
        //public Guid UserId { get; set; } = request.UserId;
        public string PhoneNumber { get; set; } = request.PhoneNumber;

        internal sealed class Validator : AbstractValidator<CreateDamageClaimCommand>
        {
            public Validator()
            {
                //RuleFor(req => req.UserId)
                //    .NotEmpty()
                //    .WithMessage("UserId is required.");
                RuleFor(req => req.PhoneNumber)
                    .NotEmpty()
                    .WithMessage("Phone number is required.")
                    .Length(11)
                    .WithMessage("Phone number must be 11 digits.")
                    .Matches("^[0-9]+$")
                    .WithMessage("Phone number must contain only digits.");
            }
        }

        public class Handler(IDamageDbContext dbContext, IClaimsProvider claimsProvider, IUsersModuleService usersModule) : ICommandHandler<CreateDamageClaimCommand, Guid>
        {
            public async Task<Result<Guid>> Handle(CreateDamageClaimCommand request, CancellationToken cancellationToken)
            {
                var userId = claimsProvider.UserId;
                if (string.IsNullOrEmpty(userId))
                {
                    return Result.Unauthorized();
                }

                var user = await usersModule.GetUserById(Guid.Parse(userId));
                if (!user.IsSuccess)
                {
                    if (user.IsInvalid())
                    {
                        return Result.Invalid(user.ValidationErrors);
                    }

                    return Result.Error(new ErrorList(user.Errors));
                }

                if (string.IsNullOrEmpty(user.Value.FirstName) || string.IsNullOrEmpty(user.Value.LastName))
                {
                    return Result.Error("Complete your profile first");
                }

                var createdClaim = DamageClaim.Create(userId, request.PhoneNumber, user.Value.FirstName, user.Value.LastName);
                if (!createdClaim.IsSuccess)
                {
                    if (createdClaim.IsInvalid())
                    {
                        return Result.Invalid(createdClaim.ValidationErrors);
                    }

                    return Result.Error(new ErrorList(createdClaim.Errors));
                }

                dbContext.DamageClaims.Add(createdClaim);
                await dbContext.SaveChangesAsync(cancellationToken);

                return Result.Success(createdClaim.Value.Id);
            }
        }
    }
}
