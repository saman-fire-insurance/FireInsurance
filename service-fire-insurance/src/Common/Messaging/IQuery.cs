using Ardalis.Result;
using MediatR;

namespace Common.Messaging;

public interface IQuery<TResponse> : IRequest<Result<TResponse>>
{
}
