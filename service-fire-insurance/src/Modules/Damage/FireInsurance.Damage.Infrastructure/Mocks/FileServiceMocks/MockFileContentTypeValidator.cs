using Ardalis.Result;
using FireInsurance.Damage.Application.Services.FileService;
using FireInsurance.Damage.Domain.Enums;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Damage.Infrastructure.Mocks.FileServiceMocks
{
    public class MockFileContentTypeValidator() : IFileContentTypeValidator
    {
        public Result<FileCategory> Validate(IFormFile file, FileCategory? expectedCategory = null)
        {
            return Result.Success(expectedCategory ?? FileCategory.Image);
        }

        public bool ValidateDocument(IFormFile file)
        {
            throw new NotImplementedException();
        }

        public bool ValidateImage(IFormFile file)
        {
            throw new NotImplementedException();
        }

        public bool ValidateVideo(IFormFile file)
        {
            throw new NotImplementedException();
        }
    }
}
