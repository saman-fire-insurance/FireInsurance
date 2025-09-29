using Ardalis.Result;
using MediatR;

namespace FireInsurance.Identity.Domain.Common.Messaging;

public interface ICommand : IRequest<Result>
{
}

public interface ICommand<TResponse> : IRequest<Result<TResponse>>
{
}
