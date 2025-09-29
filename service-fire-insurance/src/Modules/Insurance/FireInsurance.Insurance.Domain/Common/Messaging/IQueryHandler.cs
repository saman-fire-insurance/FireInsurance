using Ardalis.Result;
using MediatR;


namespace FireInsurance.Insurance.Domain.Common.Messaging;

public interface IQueryHandler<TQuery, TResponse> : IRequestHandler<TQuery, Result<TResponse>> where TQuery : IQuery<TResponse>
{
}
