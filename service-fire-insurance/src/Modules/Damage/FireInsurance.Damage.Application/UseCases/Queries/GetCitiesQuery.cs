using Ardalis.Result;
using Common.Messaging;
using Common.Pagination;
using FireInsurance.Damage.Application.Data;
using FireInsurance.Damage.Application.Dtos;
using FireInsurance.Damage.Domain.Errors;
using FluentValidation;
using Gridify;
using Mapster;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace FireInsurance.Damage.Application.UseCases.Queries;

public sealed class GetCitiesQuery(Guid provinceId, GridifyQuery auery) : IQuery<PagedList<CitySummaryDto>>
{
    public Guid ProvinceId { get; set; } = provinceId;

    public GridifyQuery Query { get; set; } = auery;


    internal sealed class RequestValidator : AbstractValidator<GetCitiesQuery>
    {
        public RequestValidator()
        {
            RuleFor(req => req.ProvinceId)
                .NotEmpty()
                .WithMessage(ProvinceErrors.Empty);

            RuleFor(req => req.Query.Page)
                .GreaterThanOrEqualTo(1);

            RuleFor(req => req.Query.PageSize)
                .GreaterThanOrEqualTo(1);
        }
    }

    internal sealed class Handler(IDamageDbContext dbContext) : IQueryHandler<GetCitiesQuery, PagedList<CitySummaryDto>>
    {
        public async Task<Result<PagedList<CitySummaryDto>>> Handle(
            GetCitiesQuery request,
            CancellationToken cancellationToken)
        {
            var query = await dbContext.Cities
                .Include(c => c.Province)
                .Where(c => c.Province.Id == request.ProvinceId)
                .ProjectToType<CitySummaryDto>()
                .GridifyQueryable(request.Query)
                .Query
                .ToListAsync(cancellationToken);

            //if (cities.CountAsync == 0)
            //{
            //    return Result.NotFound(ProvinceErrors.NotFound(request.ProvinceId));
            ////}

            //return await PagedList<CitySummaryDto>.CreateAsync(
            //    cities,
            //    request.Page,
            //    request.PageSize,
            //    cancellationToken);

            var paging = new Paging<CitySummaryDto>(query.Count, [.. query]);

            return PagedList<CitySummaryDto>.FromPaging(paging, request.Query);
        }
    }
}
