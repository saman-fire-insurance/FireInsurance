using Ardalis.Result;
using Common.Interfaces;
using Common.Messaging;
using Common.Pagination;
using FireInsurance.Damage.Application.Data;
using FireInsurance.Damage.Application.Dtos;
using FluentValidation;
using Gridify;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace FireInsurance.Damage.Application.UseCases.Queries
{
    public class GetDamageClaimsQuery(GridifyQuery query) : IQuery<PagedList<DamageClaimDto>>
    {
        public GridifyQuery Query { get; set; } = query;

        internal sealed class RequestValidator : AbstractValidator<GetDamageClaimsQuery>
        {
            public RequestValidator()
            {
                RuleFor(req => req.Query.Page)
                    .GreaterThanOrEqualTo(1);

                RuleFor(req => req.Query.PageSize)
                    .GreaterThanOrEqualTo(1);
            }
        }

        internal sealed class Handler(IDamageDbContext dbContext, IClaimsProvider claimsProvider) : IQueryHandler<GetDamageClaimsQuery, PagedList<DamageClaimDto>>
        {
            public async Task<Result<PagedList<DamageClaimDto>>> Handle(
                GetDamageClaimsQuery query,
                CancellationToken cancellationToken)
            {
                var userId = claimsProvider.UserId;
                if (string.IsNullOrEmpty(userId))
                {
                    return Result.Unauthorized();
                }

                var damageClaims = dbContext.DamageClaims
                    .Where(dc => dc.UserId == userId && !dc.IsDeleted)
                    .Include(dc => dc.Incident)
                        .ThenInclude(i => i.IncidentType)
                    .Include(dc => dc.Incident)
                        .ThenInclude(i => i.Province)
                    .Include(dc => dc.Incident)
                        .ThenInclude(i => i.City)
                    .Include(dc => dc.ThirdPartyCoverage)
                    .GridifyQueryable(query.Query);

                var data = await damageClaims.Query
                    .ProjectToType<DamageClaimDto>()
                    .ToListAsync(cancellationToken);

                var paging = new Paging<DamageClaimDto>(damageClaims.Count, [.. data]);

                return PagedList<DamageClaimDto>.FromPaging(paging, query.Query);
            }
        }
    }
}
