using Ardalis.Result;
using FireInsurance.Damage.Application.Services.FileService;
using FireInsurance.Damage.Domain.Enums;
using FireInsurance.Damage.Domain.Errors;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Damage.Infrastructure.Services.FileService
{
    public class FileContentTypeValidator// : IFileContentTypeValidator
    {
        //private static readonly List<string> _imageContentTypes = ["image/png", "image/jpg", "image/jpeg", "image/heic", "image/heif"];
        //private static readonly List<string> _videoContentTypes = ["video/mp4", "video/mov", "video/avi", "video/wmv", "video/avchd", "video/webm", "video/flv", "video/quicktime"];
        //private static readonly List<string> _documentContentTypes = ["application/pdf"];

        //private static readonly Dictionary<FileCategory, List<string>> _allowedSignatures = new()
        //{
        //    [FileCategory.Image] = [.. AllowedFileSignatures.ImageSignatures.Keys],
        //    [FileCategory.Video] = [.. AllowedFileSignatures.VideoSignatures.Keys],
        //    [FileCategory.Document] = [.. AllowedFileSignatures.DocumentSignatures.Keys]
        //};

        //private readonly int _maxSignatureLength;
        //public FileContentTypeValidator()
        //{
        //    _maxSignatureLength = AllowedFileSignatures.AllowedSignatures.Max(kvp => kvp.Value.Max(x => x.Signature.Length + x.Offset));
        //}

        ////private static readonly List<string> _documentContentTypes = [".pdf"];
        ////private static readonly List<string> _videoContentTypes = [".mp4", ".mov", ".avi", ".wmv", ".avchd", ".webm", ".flv"];
        ////private static readonly List<string> _supportedContentTypes = [.. _documentContentTypes, .. _videoContentTypes, .. _imageContentTypes];

        ////public FileContentTypeValidator(IOptions<FileContentConfiguration> options)
        ////{
        ////    _config = options?.Value ?? throw new ArgumentNullException(nameof(options), "FileContentConfiguration is not provided");
        ////}

        //public Result<FileCategory> Validate(IFormFile file, FileCategory? expectedCategory = null)
        //{
        //    if (file is null || file.Length == 0)
        //    {
        //        return Result.Error(StoredFileErrors.NotSupportedContentType);
        //    }

        //    if (string.IsNullOrWhiteSpace(file.ContentType))
        //    {
        //        return Result.Forbidden(StoredFileErrors.NotSupportedContentType);
        //    }

        //    var expectedFileType = Path.GetExtension(file.FileName).Replace(".", "").ToLower();
        //    var match = _allowedSignatures.FirstOrDefault(kvp => kvp.Value.Any(v => v == expectedFileType));
        //    if (match.Value == null)
        //    {
        //        // default value if not found
        //        return Result.Forbidden(StoredFileErrors.NotSupportedContentType);
        //    }

        //    expectedCategory ??= match.Key;

        //    var isVerified = VerifyFormat(file, expectedCategory.Value);
        //    if (!isVerified)
        //    {
        //        return Result.Forbidden(StoredFileErrors.NotSupportedContentType);
        //    }

        //    return Result.Success(expectedCategory.Value);
        //}

        //public bool ValidateImage(IFormFile file)
        //{
        //    if (file is null || file.Length == 0)
        //    {
        //        return false;
        //    }

        //    if (string.IsNullOrWhiteSpace(file.ContentType) || !_imageContentTypes.Contains(file.ContentType))
        //    {
        //        return false;
        //    }

        //    return VerifyFormat(file, FileCategory.Image);
        //}

        //public bool ValidateVideo(IFormFile file)
        //{
        //    if (file is null || file.Length == 0)
        //    {
        //        return false;
        //    }

        //    if (string.IsNullOrWhiteSpace(file.ContentType) || !_videoContentTypes.Contains(file.ContentType))
        //    {
        //        return false;
        //    }

        //    return VerifyFormat(file, FileCategory.Video);
        //}

        //public bool ValidateDocument(IFormFile file)
        //{
        //    if (file is null || file.Length == 0)
        //    {
        //        return false;
        //    }

        //    if (string.IsNullOrWhiteSpace(file.ContentType) || !_documentContentTypes.Contains(file.ContentType))
        //    {
        //        return false;
        //    }

        //    return VerifyFormat(file, FileCategory.Document);
        //}

        //private bool VerifyFormat(IFormFile file, FileCategory expectedFileType)
        //{
        //    if (file is null || file.Length == 0)
        //    {
        //        return false;
        //    }

        //    var stream = file.OpenReadStream();
        //    var isAllowed = IsFileTypeValid(stream, expectedFileType);
        //    stream.Close();

        //    return isAllowed;
        //}

        //public bool IsFileTypeValid(Stream stream, FileCategory expectedFileCategory)
        //{
        //    if (!_allowedSignatures.TryGetValue(expectedFileCategory, out var expectedFileTypes))
        //    {
        //        return false;
        //    }

        //    //var offset = expectedFileCategory == FileCategory.Video ? 4 : 0;
        //    var fileType = GetFileTypeByMagicNumber(stream);
        //    if (fileType == null)
        //    {
        //        return false;
        //    }

        //    return expectedFileTypes.Contains(fileType);
        //}

        //public string? GetFileTypeByMagicNumber(Stream stream)
        //{
        //    stream.Seek(0, SeekOrigin.Begin);
        //    byte[] buffer = new byte[_maxSignatureLength];
        //    stream.Read(buffer, 0, buffer.Length);

        //    foreach (var kvp in AllowedFileSignatures.AllowedSignatures)
        //    {
        //        foreach (var (signature, offset) in kvp.Value)
        //        {
        //            if (buffer.Skip(offset).Take(signature.Length).SequenceEqual(signature))
        //            {
        //                return kvp.Key;
        //            }
        //        }
        //    }

        //    return null;
        //}
    }
}
