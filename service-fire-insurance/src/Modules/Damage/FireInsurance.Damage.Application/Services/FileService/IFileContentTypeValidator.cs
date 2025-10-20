using Ardalis.Result;
using FireInsurance.Damage.Domain.Enums;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Damage.Application.Services.FileService
{
    public interface IFileContentTypeValidator
    {
        Result<FileCategory> Validate(IFormFile file, FileCategory? expectedCategory = null);
        bool ValidateImage(IFormFile file);
        bool ValidateVideo(IFormFile file);
        bool ValidateDocument(IFormFile file);
    }

}
