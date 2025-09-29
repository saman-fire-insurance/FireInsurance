using Ardalis.Result;
using MediatR;


namespace FireInsurance.Identity.Domain.Common.Messaging;

public interface IQueryHandler<TQuery, TResponse> : IRequestHandler<TQuery, Result<TResponse>> where TQuery : IQuery<TResponse>
{
}
