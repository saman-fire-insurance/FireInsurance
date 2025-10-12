using Ardalis.Result;
using Ardalis.Result.FluentValidation;
using FluentValidation;
using MediatR;

namespace Common.Behaviors;

public sealed class ValidationBehavior<TRequest, TResponse>(IEnumerable<IValidator<TRequest>> validators)
    : IPipelineBehavior<TRequest, TResponse> where TRequest
    : IRequest<TResponse>
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        if (validators.Any())
        {
            var context = new ValidationContext<TRequest>(request);

            var results = await Task.WhenAll(validators.Select(v => v.ValidateAsync(context, cancellationToken)));

            var errors = results
                .SelectMany(r => r.AsErrors())
                .ToList();

            var failures = results
                .SelectMany(r => r.Errors)
                .Where(f => f is not null)
                .ToList();

            if (failures.Count != 0)
            {
                if (typeof(TResponse).IsGenericType && typeof(TResponse).GetGenericTypeDefinition() == typeof(Result<>))
                {
                    var resultType = typeof(TResponse)
                        .GetGenericArguments()[0];

                    var invalidMethod = typeof(Result<>)
                        .MakeGenericType(resultType)
                        .GetMethod(nameof(Result<int>.Invalid), [typeof(List<ValidationError>)]);

                    if (invalidMethod is not null)
                    {
                        var result = invalidMethod.Invoke(null, [errors]);

                        if (result is not null)
                        {
                            return (TResponse)result;
                        }
                    }
                }

                if (typeof(TResponse) == typeof(Result))
                {
                    return (TResponse)(object)Result.Invalid(errors);
                }

                throw new ValidationException(failures);
            }
        }

        return await next(cancellationToken);
    }
}
