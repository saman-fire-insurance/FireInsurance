using Ardalis.Result;
using FireInsurance.Damage.Application.Dtos;
using FireInsurance.Damage.Application.Services.FileService;
using FireInsurance.Damage.Domain.Errors;
using Microsoft.AspNetCore.Http;

namespace FireInsurance.Damage.Infrastructure.Mocks.FileServiceMocks
{
    public class MockFileService(IFileContentTypeValidator contentTypeValidator) : IFileService
    {
        private readonly IFileContentTypeValidator _contentTypeValidator = contentTypeValidator;

        public async Task<Result<StoredFileDto>> UploadAsync(
            IFormFile file,
            CancellationToken cancellationToken)
        {

            var contentTypeValidationResult = _contentTypeValidator.Validate(file);
            if (!contentTypeValidationResult.IsSuccess)
            {
                return Result<StoredFileDto>.Invalid(new ValidationError(StoredFileErrors.NotSupportedContentType));
            }

            await Task.CompletedTask;

            var storedFile = new StoredFileDto
            {
                Id = Guid.NewGuid(),
                Name = file.Name,
                ContentType = file.ContentType,
                BucketName = "mockBucket",
                SizeInBytes = file.Length,
                UploadedAt = DateTime.UtcNow
            };

            return Result<StoredFileDto>.Success(storedFile);
        }
    }
}
