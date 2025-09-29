using Ardalis.Result;
using MediatR;

namespace FireInsurance.Insurance.Domain.Common.Messaging;

public interface IQuery<TResponse> : IRequest<Result<TResponse>>
{
}
