using Ardalis.Result;
using FireInsurance.Damage.Application.Dtos;
using Microsoft.AspNetCore.Http;

namespace FireInsurance.Damage.Application.Services.FileService
{
    public interface IFileService
    {
        Task<Result<StoredFileDto>> UploadAsync(IFormFile file, CancellationToken cancellationToken);
    }
}
