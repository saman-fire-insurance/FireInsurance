using Ardalis.Result;
using Common.Messaging;
using FireInsurance.Damage.Application.Data;
using FireInsurance.Damage.Application.Dtos;
using FireInsurance.Damage.Domain.Entities;
using FireInsurance.Damage.Domain.Errors;
using FluentValidation;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace FireInsurance.Damage.Application.UseCases.Commands
{
    public sealed record StakeHolderItemRequest(
        string FirstName,
        string LastName,
        string PhoneNumber,
        string? AccountNumber = null,
        string? Iban = null,
        bool IsOwner = false);

    public sealed record AddStakeHoldersInfoToClaimRequest(
        Guid DamageClaimId,
        List<StakeHolderItemRequest> StakeHolders);

    public class AddStakeHoldersInfoToClaimCommand(AddStakeHoldersInfoToClaimRequest request) : ICommand<DamageClaimDto>
    {
        public Guid DamageClaimId { get; set; } = request.DamageClaimId;
        public List<StakeHolderItemRequest> StakeHolders { get; set; } = request.StakeHolders;

        internal sealed class Validator : AbstractValidator<AddStakeHoldersInfoToClaimCommand>
        {
            public Validator()
            {
                RuleFor(req => req.DamageClaimId)
                    .NotEmpty()
                    .WithMessage(DamageClaimErrors.Empty);

                RuleFor(req => req.StakeHolders)
                    .NotEmpty()
                    .WithMessage("Stakeholders list cannot be empty.");

                RuleForEach(req => req.StakeHolders).ChildRules(item =>
                {
                    item.RuleFor(x => x.FirstName)
                        .NotEmpty()
                        .WithMessage("First name is required.")
                        .MaximumLength(100)
                        .WithMessage("First name must not exceed 100 characters.");

                    item.RuleFor(x => x.LastName)
                        .NotEmpty()
                        .WithMessage("Last name is required.")
                        .MaximumLength(100)
                        .WithMessage("Last name must not exceed 100 characters.");

                    item.RuleFor(x => x.PhoneNumber)
                        .NotEmpty()
                        .WithMessage("Phone number is required.")
                        .Length(11)
                        .WithMessage("Phone number must be 11 digits.")
                        .Matches("^[0-9]+$")
                        .WithMessage("Phone number must contain only digits.");

                    item.RuleFor(x => x.AccountNumber)
                        .MaximumLength(50)
                        .WithMessage("Account number must not exceed 50 characters.")
                        .When(x => !string.IsNullOrWhiteSpace(x.AccountNumber));

                    item.RuleFor(x => x.Iban)
                        .MaximumLength(34)
                        .WithMessage("IBAN must not exceed 34 characters.")
                        .When(x => !string.IsNullOrWhiteSpace(x.Iban));
                });
            }
        }

        public class Handler(IDamageDbContext dbContext) : ICommandHandler<AddStakeHoldersInfoToClaimCommand, DamageClaimDto>
        {
            public async Task<Result<DamageClaimDto>> Handle(AddStakeHoldersInfoToClaimCommand request, CancellationToken cancellationToken)
            {
                // Find the damage claim
                var damageClaim = await dbContext.DamageClaims
                    .Include(dc => dc.StakeHolders)
                    .SingleOrDefaultAsync(c => c.Id == request.DamageClaimId, cancellationToken);

                if (damageClaim == null)
                {
                    return Result.NotFound(DamageClaimErrors.NotFound(request.DamageClaimId));
                }

                // Create StakeHolder entities using factory method
                //var insurerStakeHolder = StakeHolder.Create()

                var stakeHolders = new List<StakeHolder>();
                foreach (var item in request.StakeHolders)
                {
                    var stakeHolderResult = StakeHolder.Create(
                        firstName: item.FirstName,
                        lastName: item.LastName,
                        phoneNumber: item.PhoneNumber,
                        accountNumber: item.AccountNumber,
                        iban: item.Iban,
                        isOwner: item.IsOwner);

                    if (!stakeHolderResult.IsSuccess)
                    {
                        if (stakeHolderResult.IsInvalid())
                        {
                            return Result.Invalid(stakeHolderResult.ValidationErrors);
                        }

                        return Result.Error(new ErrorList(stakeHolderResult.Errors));
                    }

                    stakeHolders.Add(stakeHolderResult.Value);
                }

                dbContext.StakeHolders.AddRange(stakeHolders);

                // Add stakeholders to the claim using the domain method
                var result = damageClaim.AddStakeHolders(stakeHolders);
                if (!result.IsSuccess)
                {
                    if (result.IsInvalid())
                    {
                        return Result.Invalid(result.ValidationErrors);
                    }

                    return Result.Error(new ErrorList(result.Errors));
                }

                // Save changes
                await dbContext.SaveChangesAsync(cancellationToken);

                return Result.Success(damageClaim.Adapt<DamageClaimDto>());
            }
        }
    }
}
