using Ardalis.Result;
using Common.Interfaces;
using Common.Messaging;
using FireInsurance.Damage.Application.Data;
using FireInsurance.Damage.Application.Dtos;
using FireInsurance.Damage.Domain.Errors;
using FluentValidation;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace FireInsurance.Damage.Application.UseCases.Queries
{
    public sealed record GetDamageClaimDetailsRequest(Guid DamageClaimId);

    public class GetDamageClaimDetailsQuery(GetDamageClaimDetailsRequest request) : IQuery<DamageClaimDto>
    {
        public Guid DamageClaimId { get; set; } = request.DamageClaimId;

        internal sealed class RequestValidator : AbstractValidator<GetDamageClaimDetailsQuery>
        {
            public RequestValidator()
            {
                RuleFor(req => req.DamageClaimId)
                    .NotEmpty()
                    .WithMessage(DamageClaimErrors.Empty);
            }
        }

        internal sealed class Handler(IDamageDbContext dbContext, IClaimsProvider claimsProvider) : IQueryHandler<GetDamageClaimDetailsQuery, DamageClaimDto>
        {
            public async Task<Result<DamageClaimDto>> Handle(
                GetDamageClaimDetailsQuery query,
                CancellationToken cancellationToken)
            {
                var userId = claimsProvider.UserId;
                if (string.IsNullOrEmpty(userId))
                {
                    return Result.Unauthorized();
                }

                var damageClaim = await dbContext.DamageClaims
                    .Where(dc => dc.Id == query.DamageClaimId && dc.UserId == userId && !dc.IsDeleted)
                    .Include(dc => dc.OwnershipType)
                    .Include(dc => dc.DamagedObjects)
                        .ThenInclude(dc => dc.InsurableObject)
                    //.Include(dc => dc.InsuranceFileIds)
                    .Include(dc => dc.StakeHolders)
                    .Include(dc => dc.Incident)
                        .ThenInclude(i => i.IncidentType)
                    .Include(dc => dc.Incident)
                        .ThenInclude(i => i.Province)
                    .Include(dc => dc.Incident)
                        .ThenInclude(i => i.City)
                    .Include(dc => dc.ThirdPartyCoverage)
                        .ThenInclude(tc => tc.ThirdPartyCoveredObjects)
                            .ThenInclude(tpco => tpco.InsurableObject)
                    .AsNoTracking()
                    .AsSplitQuery()
                    .SingleOrDefaultAsync(cancellationToken);

                if (damageClaim == null)
                {
                    return Result.NotFound(DamageClaimErrors.NotFound(query.DamageClaimId));
                }

                return Result.Success(damageClaim.Adapt<DamageClaimDto>());
            }
        }
    }
}
