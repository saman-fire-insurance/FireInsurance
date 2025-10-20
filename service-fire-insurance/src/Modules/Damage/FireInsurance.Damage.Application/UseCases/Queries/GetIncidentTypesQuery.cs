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
    public class GetIncidentTypesQuery(GridifyQuery query) : IQuery<PagedList<IncidentTypeDto>>
    {
        public GridifyQuery Query { get; set; } = query;

        internal sealed class RequestValidator : AbstractValidator<GetIncidentTypesQuery>
        {
            public RequestValidator()
            {
                RuleFor(req => req.Query.Page)
                    .GreaterThanOrEqualTo(1);

                RuleFor(req => req.Query.PageSize)
                    .GreaterThanOrEqualTo(1);
            }
        }

        internal sealed class Handler(IDamageDbContext dbContext) : IQueryHandler<GetIncidentTypesQuery, PagedList<IncidentTypeDto>>
        {
            public async Task<Result<PagedList<IncidentTypeDto>>> Handle(
                GetIncidentTypesQuery query,
                CancellationToken cancellationToken)
            {
                var incidentTypes = dbContext.IncidentTypes
                    .Where(p => !p.IsDeleted)
                    .GridifyQueryable(query.Query);

                var data = await incidentTypes.Query
                    .ProjectToType<IncidentTypeDto>()
                    .ToListAsync(cancellationToken);

                var paging = new Paging<IncidentTypeDto>(incidentTypes.Count, [.. data]);

                return PagedList<IncidentTypeDto>.FromPaging(paging, query.Query);
            }
        }
    }
}
