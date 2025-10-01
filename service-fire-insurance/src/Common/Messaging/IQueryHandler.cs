using Ardalis.Result;
using Common.Messaging;
using MediatR;


namespace Common.Messaging;

public interface IQueryHandler<TQuery, TResponse> : IRequestHandler<TQuery, Result<TResponse>> where TQuery : IQuery<TResponse>
{
}
