using Ardalis.Result;
using Common.Messaging;
using FireInsurance.Damage.Application.Data;
using FireInsurance.Damage.Application.Dtos;
using FireInsurance.Damage.Domain.Entities;
using FluentValidation;

namespace FireInsurance.Damage.Application.UseCases.Commands
{
    public sealed record CreateDamageClaimRequest(Guid UserId, string PhoneNumber);

    public class CreateDamageClaimCommand(CreateDamageClaimRequest request) : ICommand<Guid>
    {
        public Guid UserId { get; set; } = request.UserId;
        public string PhoneNumber { get; set; } = request.PhoneNumber;

        internal sealed class Validator : AbstractValidator<CreateDamageClaimCommand>
        {
            public Validator()
            {
                RuleFor(req => req.UserId)
                    .NotEmpty()
                    .WithMessage("UserId is required.");
                RuleFor(req => req.PhoneNumber)
                    .NotEmpty()
                    .WithMessage("Phone number is required.")
                    .Length(11)
                    .WithMessage("Phone number must be 11 digits.")
                    .Matches("^[0-9]+$")
                    .WithMessage("Phone number must contain only digits.");
            }
        }

        public class Handler(IDamageDbContext dbContext) : ICommandHandler<CreateDamageClaimCommand, Guid>
        {
            public async Task<Result<Guid>> Handle(CreateDamageClaimCommand request, CancellationToken cancellationToken)
            {
                var createdClaim = DamageClaim.Create(request.UserId, request.PhoneNumber);
                if (!createdClaim.IsSuccess)
                {
                    if (createdClaim.IsInvalid())
                    {
                        return Result.Invalid(createdClaim.ValidationErrors);
                    }

                    return Result.Error(new ErrorList(createdClaim.Errors));
                }

                // Save changes
                dbContext.DamageClaims.Add(createdClaim);
                await dbContext.SaveChangesAsync(cancellationToken);

                return Result.Success(createdClaim.Value.Id);
            }
        }
    }
}
