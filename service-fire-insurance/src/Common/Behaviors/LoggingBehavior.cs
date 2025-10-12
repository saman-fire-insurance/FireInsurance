using MediatR;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Reflection;

namespace Common.Behaviors;

public sealed class LoggingBehavior<TRequest, TResponse>(ILogger<LoggingBehavior<TRequest, TResponse>> logger)
    : IPipelineBehavior<TRequest, TResponse> where TRequest
    : IRequest<TResponse>
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {

#if DEBUG
        if (logger.IsEnabled(LogLevel.Information))
        {
            logger.LogInformation("Handling {RequestName}", typeof(TRequest).Name);

            Type myType = request.GetType();

            IList<PropertyInfo> props = [.. myType.GetProperties()];

            foreach (var prop in props)
            {
                logger.LogInformation(
                    "Property {Property} : {@Value}",
                    prop?.Name,
                    prop?.GetValue(request, null));
            }
        }
#endif
        var sw = Stopwatch.StartNew();

        var response = await next(cancellationToken);

        logger.LogInformation(
            "Handled {RequestName} with {Response} in {ms} ms",
            typeof(TRequest).Name,
            response,
            sw.ElapsedMilliseconds);

        sw.Stop();

        return response;
    }
}
