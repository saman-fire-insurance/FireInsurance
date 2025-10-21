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
    public sealed record AddInsuranceInfoToClaimRequest(Guid DamageClaimId, string SerialNumber, List<Guid>? FileIds, ThirdPartyCoverageDto? ThirdPartyCoverage = null);

    public class AddInsuranceInfoToClaimCommand(AddInsuranceInfoToClaimRequest request) : ICommand<DamageClaimDto>
    {
        public Guid DamageClaimId { get; set; } = request.DamageClaimId;
        public string SerialNumber { get; set; } = request.SerialNumber;
        public List<Guid>? FileIds { get; set; } = request.FileIds;
        public ThirdPartyCoverageDto? ThirdPartyCoverage { get; set; } = request.ThirdPartyCoverage;

        internal sealed class Validator : AbstractValidator<AddInsuranceInfoToClaimCommand>
        {
            public Validator()
            {
                RuleFor(req => req.DamageClaimId)
                    .NotEmpty()
                    .WithMessage(DamageClaimErrors.Empty);

                RuleFor(req => req.SerialNumber)
                    .NotEmpty()
                    .WithMessage(DamageClaimErrors.InsuranceError.Empty)
                    .Length(4, 50)
                    .WithMessage(DamageClaimErrors.InsuranceError.Length(4, 50));
            }
        }

        public class Handler(IDamageDbContext dbContext) : ICommandHandler<AddInsuranceInfoToClaimCommand, DamageClaimDto>
        {
            public async Task<Result<DamageClaimDto>> Handle(AddInsuranceInfoToClaimCommand request, CancellationToken cancellationToken)
            {
                var damageClaim = await dbContext.DamageClaims.SingleOrDefaultAsync(c => c.Id == request.DamageClaimId, cancellationToken);
                if (damageClaim == null)
                {
                    return Result.NotFound(DamageClaimErrors.NotFound(request.DamageClaimId));
                }

                //damageClaim.SerialNumber = request.SerialNumber;

                //if (request.FileIds?.Count > 0)
                //{
                //    damageClaim.FileIds = request.FileIds;
                //}

                //if (request.ThirdPartyCoverage != null)
                //{
                //    damageClaim.ThirdPartyCoverage = request.ThirdPartyCoverage.Adapt<ThirdPartyCoverage>();
                //}

                damageClaim = damageClaim.AddInsuranceInfo(request.SerialNumber, request.FileIds, request.ThirdPartyCoverage.Adapt<ThirdPartyCoverage>());

                await dbContext.SaveChangesAsync(cancellationToken);

                return Result.Success(damageClaim.Adapt<DamageClaimDto>());
            }
        }
    }
}
