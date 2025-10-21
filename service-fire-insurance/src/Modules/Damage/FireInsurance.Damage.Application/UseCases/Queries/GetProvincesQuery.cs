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
    public sealed class GetProvincesQuery(GridifyQuery query) : IQuery<PagedList<ProvinceSummaryDto>>
    {
        public GridifyQuery Query { get; set; } = query;

        internal sealed class RequestValidator : AbstractValidator<GetProvincesQuery>
        {
            public RequestValidator()
            {
                RuleFor(req => req.Query.Page)
                    .GreaterThanOrEqualTo(1);

                RuleFor(req => req.Query.PageSize)
                    .GreaterThanOrEqualTo(1);
            }
        }

        internal sealed class Handler(IDamageDbContext dbContext) : IQueryHandler<GetProvincesQuery, PagedList<ProvinceSummaryDto>>
        {
            public async Task<Result<PagedList<ProvinceSummaryDto>>> Handle(GetProvincesQuery request, CancellationToken cancellationToken)
            {
                var query = await dbContext.Provinces
                    .ProjectToType<ProvinceSummaryDto>()
                    .GridifyQueryable(request.Query)
                    .Query
                    .ToListAsync(cancellationToken);

                var paging = new Paging<ProvinceSummaryDto>(query.Count, [.. query]);

                return PagedList<ProvinceSummaryDto>.FromPaging(paging, request.Query);
            }
        }
    }

}
