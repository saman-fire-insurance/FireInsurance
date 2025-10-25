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
        string FullName,
        //string LastName,
        string PhoneNumber,
        bool IsOwner = false);

    public sealed record AddStakeHoldersInfoToClaimRequest(
        Guid DamageClaimId,
        string AccountNumber,
        string Iban,
        bool HasOtherStakeHolder = false,
        List<StakeHolderItemRequest>? OtherStakeHolders = null,
        bool HasNeighborStakeHolder = false,
        List<StakeHolderItemRequest>? NeighborStakeHolders = null);

    public class AddStakeHoldersInfoToClaimCommand(AddStakeHoldersInfoToClaimRequest request) : ICommand<DamageClaimDto>
    {
        public Guid DamageClaimId { get; set; } = request.DamageClaimId;
        public string AccountNumber { get; set; } = request.AccountNumber;
        public string Iban { get; set; } = request.Iban;
        public bool HasOtherStakeHolder { get; set; } = request.HasOtherStakeHolder;
        public List<StakeHolderItemRequest>? OtherStakeHolders { get; set; } = request.OtherStakeHolders;
        public bool HasNeighborStakeHolder { get; set; } = request.HasNeighborStakeHolder;
        public List<StakeHolderItemRequest>? NeighborStakeHolders { get; set; } = request.NeighborStakeHolders;

        internal sealed class Validator : AbstractValidator<AddStakeHoldersInfoToClaimCommand>
        {
            public Validator()
            {
                RuleFor(req => req.DamageClaimId)
                    .NotEmpty()
                    .WithMessage(DamageClaimErrors.Empty);

                RuleFor(req => req.AccountNumber)
                    .NotEmpty()
                    .WithMessage("شماره حساب نمی تواند خالی باشد");

                RuleFor(req => req.Iban)
                    .NotEmpty()
                    .WithMessage("شماره شبا نمی تواند خالی باشد");

                RuleFor(req => req.Iban)
                    .Matches(@"^IR[0-9]{24}$")
                    .WithMessage("فرمت شماره شبا صحیح نیست");
            }
        }

        public class Handler(IDamageDbContext dbContext) : ICommandHandler<AddStakeHoldersInfoToClaimCommand, DamageClaimDto>
        {
            public async Task<Result<DamageClaimDto>> Handle(AddStakeHoldersInfoToClaimCommand request, CancellationToken cancellationToken)
            {
                // Find the damage claim
                var damageClaim = await dbContext.DamageClaims
                    .Include(dc => dc.StakeHolders)
                    .Include(dc => dc.Insurer)
                    .SingleOrDefaultAsync(c => c.Id == request.DamageClaimId, cancellationToken);

                if (damageClaim == null)
                {
                    return Result.NotFound(DamageClaimErrors.NotFound(request.DamageClaimId));
                }

                // Update insurer's bank account info
                var insurer = damageClaim.Insurer;
                if (insurer == null)
                {
                    return Result.Error(DamageClaimErrors.InsurerError.Empty);
                }
                insurer.AddBankAccountInfo(request.AccountNumber, request.Iban);

                // Create StakeHolder entities
                var stakeHolders = new List<StakeHolder>();
                if (request.OtherStakeHolders?.Count > 0)
                {
                    foreach (var item in request.OtherStakeHolders)
                    {
                        var stakeHolderResult = StakeHolder.Create(
                            fullName: item.FullName,
                            //lastName: item.LastName,
                            phoneNumber: item.PhoneNumber,
                            //accountNumber: item.AccountNumber,
                            //iban: item.Iban,
                            isOwner: true);

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
                }

                if (request.NeighborStakeHolders?.Count > 0)
                {
                    foreach (var item in request.NeighborStakeHolders)
                    {
                        var stakeHolderResult = StakeHolder.Create(
                            fullName: item.FullName,
                            //lastName: item.LastName,
                            phoneNumber: item.PhoneNumber,
                            //accountNumber: item.AccountNumber,
                            //iban: item.Iban,
                            isOwner: false);

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
