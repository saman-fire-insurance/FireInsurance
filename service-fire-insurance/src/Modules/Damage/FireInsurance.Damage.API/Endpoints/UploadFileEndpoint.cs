using Common.Abstraction.MinimalApi;
using Common.Extensions;
using FireInsurance.Damage.Application.UseCases.Commands;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace FireInsurance.Damage.API.Endpoints
{
    internal sealed class UploadFileEndpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/DamageClaim/UploadFile", UploadFileAsync)
                .RequireAuthorization()
                .DisableAntiforgery()
                .WithTags(Tags.File);
        }

        public static async Task<IResult> UploadFileAsync(IFormFile file, ISender sender, CancellationToken cancellationToken)
        {
            var command = new UploadFileCommand(file);
            var result = await sender.Send(command, cancellationToken);

            return result.ToActionResult();
        }
    }
}
