using Ardalis.Result;
using Common.Messaging;
using FireInsurance.Damage.Application.Dtos;
using FireInsurance.Damage.Application.Services.FileService;
using FireInsurance.Damage.Domain.Errors;
using FluentValidation;
using MapsterMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace FireInsurance.Damage.Application.UseCases.Commands
{
    public sealed class UploadFileCommand(IFormFile file) : ICommand<StoredFileDto>
    {
        public IFormFile File { get; set; } = file;

        internal sealed class Validator : AbstractValidator<UploadFileCommand>
        {
            public Validator()
            {
                RuleFor(req => req.File)
                    .NotEmpty()
                    .WithMessage(StoredFileErrors.Empty);
            }
        }

        internal sealed class Handler(
            IFileService fileUploader,
            ILogger<UploadFileCommand> logger) : ICommandHandler<UploadFileCommand, StoredFileDto>
        {
            public async Task<Result<StoredFileDto>> Handle(UploadFileCommand request, CancellationToken cancellationToken)
            {
                try
                {
                    var file = await fileUploader.UploadAsync(request.File, cancellationToken);
                    if (!file.IsSuccess)
                    {
                        if (file.IsInvalid())
                        {
                            return Result.Invalid(file.ValidationErrors);
                        }

                        return Result.Error(new ErrorList(file.Errors ?? [StoredFileErrors.NotCreated]));
                    }

                    return file.Value;
                    //return mapper.Map<StoredFileDto>(file.Value);
                }
                catch (Exception ex)
                {
                    logger.LogError("Upload went wrong");
                    logger.LogError(ex, ex.Message);

                    return Result.Error(new ErrorList([$"{ex.Message}"]));
                }
            }
        }
    }
}
