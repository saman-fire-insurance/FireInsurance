using Ardalis.Result;
using MediatR;

namespace FireInsurance.Identity.Domain.Common.Messaging;

public interface IQuery<TResponse> : IRequest<Result<TResponse>>
{
}
