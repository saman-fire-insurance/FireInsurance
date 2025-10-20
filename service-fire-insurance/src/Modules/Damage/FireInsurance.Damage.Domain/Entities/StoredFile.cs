using Ardalis.Result;
using FireInsurance.Damage.Domain.Common;
using FireInsurance.Damage.Domain.Enums;

namespace FireInsurance.Damage.Domain.Entities
{
    public sealed class StoredFile : BaseEntity
    {
        public static readonly StoredFile None = new();

        public static readonly ValidationError Empty = new("The stored file is required.");

        private const int _maximumLimit = 50 * 1024 * 1024; // 50 MB

        // Used by EF Core
        private StoredFile()
        {
        }

        public string Name { get; private set; } = string.Empty;

        public string Key { get; private set; } = string.Empty;

        public string ContentType { get; private set; } = string.Empty;

        public string BucketName { get; private set; } = string.Empty;

        public long SizeInBytes { get; private set; }

        public DateTime UploadedAt { get; private set; }

        public FileCategory FileCategory { get; private set; }

        public static Result<StoredFile> Create(
            string name,
            string key,
            string contentType,
            string bucketName,
            long sizeInBytes,
            FileCategory fileCategory)
        {
            if (sizeInBytes == 0)
            {
                return Result.Invalid(new ValidationError("The file size must be greater thatn zero."));
            }

            if (sizeInBytes > _maximumLimit)
            {
                return Result.Invalid(new ValidationError("the file size exceeds the maximum limit."));
            }

            return new StoredFile
            {
                Name = name,
                Key = key,
                ContentType = contentType,
                BucketName = bucketName,
                SizeInBytes = sizeInBytes,
                UploadedAt = DateTime.UtcNow,
                FileCategory = fileCategory
            };
        }
    }
}
