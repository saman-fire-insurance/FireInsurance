using Ardalis.Result;
using Microsoft.AspNetCore.Http;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Common.Extensions
{
    public static class ResultExtensions
    {
        public static IResult ToActionResult<T>(this Result<T> result)
        {
            if (result.IsSuccess)
            {
                return Results.Ok(result.Value);
            }

            return result.Status switch
            {
                ResultStatus.NotFound => Results.NotFound(new
                {
                    message = "Resource not found",
                    errors = result.Errors
                }),

                ResultStatus.Unauthorized => Results.Problem(
                    title: "Unauthorized",
                    statusCode: 401,
                    detail: string.Join(", ", result.Errors.FirstOrDefault())
                ),

                ResultStatus.Forbidden => Results.Problem(
                    title: "Forbidden",
                    statusCode: 403,
                    detail: string.Join(", ", result.Errors.FirstOrDefault())
                ),

                ResultStatus.Invalid => Results.ValidationProblem(
                    result.ValidationErrors.ToDictionary(
                        e => $"{ e.Identifier ?? "General"} - { e.ErrorCode }",
                        e => new[] { e.ErrorMessage }
                    ),
                    title: "Validation failed",
                    detail: "One or more validation errors occurred"
                ),

                ResultStatus.Conflict => Results.Conflict(new
                {
                    message = "Resource conflict",
                    errors = result.Errors
                }),

                _ => Results.Problem(
                    title: "An error occurred",
                    statusCode: 500,
                    detail: string.Join(", ", result.Errors.FirstOrDefault()) ?? "An unexpected error occurred"
                )
            };
        }
    }
}
