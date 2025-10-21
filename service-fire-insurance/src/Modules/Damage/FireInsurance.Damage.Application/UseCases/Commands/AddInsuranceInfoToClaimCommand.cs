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
    public sealed record AddThirdPartyCoverageRequest (string CompanyName, string PolicyNumber, List<Guid> InsurableObjectIds);
    public sealed record AddInsuranceInfoToClaimRequest(Guid DamageClaimId, string SerialNumber, List<Guid>? FileIds, AddThirdPartyCoverageRequest? AddThirdPartyCoverageRequest = null);

    public class AddInsuranceInfoToClaimCommand(AddInsuranceInfoToClaimRequest request) : ICommand<DamageClaimDto>
    {
        public Guid DamageClaimId { get; set; } = request.DamageClaimId;
        public string SerialNumber { get; set; } = request.SerialNumber;
        public List<Guid>? FileIds { get; set; } = request.FileIds;
        public AddThirdPartyCoverageRequest? AddThirdPartyCoverageRequest { get; set; } = request.AddThirdPartyCoverageRequest;

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

                ThirdPartyCoverage? thirdPartyCoverage = null;
                var coverageRequest = request.AddThirdPartyCoverageRequest;
                if (coverageRequest != null)
                {
                    var insurableObjects = dbContext.InsurableObjects
                        .Where(io => 
                            coverageRequest != null &&
                            coverageRequest.InsurableObjectIds != null && 
                            coverageRequest.InsurableObjectIds.Contains(io.Id))
                        .ToList();

                    thirdPartyCoverage = ThirdPartyCoverage.Create(coverageRequest.CompanyName, coverageRequest.PolicyNumber, insurableObjects);

                    dbContext.ThirdPartyCoverages.Add(thirdPartyCoverage);
                }

                damageClaim = damageClaim.AddInsuranceInfo(request.SerialNumber, request.FileIds, thirdPartyCoverage);

                await dbContext.SaveChangesAsync(cancellationToken);

                return Result.Success(damageClaim.Adapt<DamageClaimDto>());
            }
        }
    }
}
