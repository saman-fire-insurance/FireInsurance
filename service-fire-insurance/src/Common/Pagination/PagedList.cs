using Gridify;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace Common.Pagination;

public sealed class PagedList<T>
{
    [JsonConstructor]
    private PagedList(
        List<T> items,
        int page,
        int pageSize,
        int totalCount)
    {
        Items = items ?? [];
        Page = page;
        PageSize = pageSize;
        TotalCount = totalCount;
    }

    public List<T> Items { get; private set; } = [];

    public int Page { get; private set; }

    public int PageSize { get; private set; }

    public int TotalCount { get; private set; }

    public bool HasNextPage => Page * PageSize < TotalCount;

    public bool HasPreviousPage => Page > 1;

    public static async Task<PagedList<T>> CreateAsync(
        IQueryable<T> query,
        int page,
        int pageSize,
        CancellationToken cancellationToken,
        bool ignorePagination = false)
    {
        var totalCount = await query.CountAsync(cancellationToken);

        page = ignorePagination ? 1 : page;
        pageSize = ignorePagination ? totalCount : pageSize;

        var skip = (page - 1) * pageSize;
        var take = ignorePagination ? int.MaxValue : pageSize;

        var items = await query.Skip(skip).Take(take).ToListAsync(cancellationToken) ?? [];

        return new(items, page, pageSize, totalCount);
    }

    public static PagedList<T> FromPaging(
        Paging<T> paging,
        GridifyQuery query)
    {
        return new([.. paging.Data], query.Page, query.PageSize, paging.Count);
    }
}
