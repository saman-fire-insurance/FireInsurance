using Ardalis.Result;
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
    public class GetOwnershipTypesQuery(GridifyQuery query) : IQuery<PagedList<OwnershipTypeDto>>
    {
        public GridifyQuery Query { get; set; } = query;

        internal sealed class RequestValidator : AbstractValidator<GetOwnershipTypesQuery>
        {
            public RequestValidator()
            {
                RuleFor(req => req.Query.Page)
                    .GreaterThanOrEqualTo(1);

                RuleFor(req => req.Query.PageSize)
                    .GreaterThanOrEqualTo(1);
            }
        }

        internal sealed class Handler(IDamageDbContext dbContext) : IQueryHandler<GetOwnershipTypesQuery, PagedList<OwnershipTypeDto>>
        {
            public async Task<Result<PagedList<OwnershipTypeDto>>> Handle(
                GetOwnershipTypesQuery query,
                CancellationToken cancellationToken)
            {
                var ownershipTypes = dbContext.OwnershipTypes
                    .Where(p => !p.IsDeleted)
                    .GridifyQueryable(query.Query);

                var data = await ownershipTypes.Query
                    .ProjectToType<OwnershipTypeDto>()
                    .ToListAsync(cancellationToken);

                var paging = new Paging<OwnershipTypeDto>(ownershipTypes.Count, [.. data]);

                return PagedList<OwnershipTypeDto>.FromPaging(paging, query.Query);
            }
        }
    }
}
