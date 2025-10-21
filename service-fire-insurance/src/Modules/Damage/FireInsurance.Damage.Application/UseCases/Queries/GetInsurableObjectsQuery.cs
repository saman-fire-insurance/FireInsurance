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
    public class GetInsurableObjectsQuery(GridifyQuery query) : IQuery<PagedList<InsurableObjectDto>>
    {
        public GridifyQuery Query { get; set; } = query;

        internal sealed class RequestValidator : AbstractValidator<GetInsurableObjectsQuery>
        {
            public RequestValidator()
            {
                RuleFor(req => req.Query.Page)
                    .GreaterThanOrEqualTo(1);

                RuleFor(req => req.Query.PageSize)
                    .GreaterThanOrEqualTo(1);
            }
        }

        internal sealed class Handler(IDamageDbContext dbContext) : IQueryHandler<GetInsurableObjectsQuery, PagedList<InsurableObjectDto>>
        {
            public async Task<Result<PagedList<InsurableObjectDto>>> Handle(
                GetInsurableObjectsQuery query,
                CancellationToken cancellationToken)
            {
                var insurableObjects = dbContext.InsurableObjects
                    .Where(p => !p.IsDeleted)
                    .GridifyQueryable(query.Query);

                var data = await insurableObjects.Query
                    .ProjectToType<InsurableObjectDto>()
                    .ToListAsync(cancellationToken);

                var paging = new Paging<InsurableObjectDto>(insurableObjects.Count, [.. data]);

                return PagedList<InsurableObjectDto>.FromPaging(paging, query.Query);
            }
        }
    }
}
