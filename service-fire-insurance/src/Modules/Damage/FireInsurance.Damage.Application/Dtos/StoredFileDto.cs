
namespace FireInsurance.Damage.Application.Dtos
{
    public sealed class StoredFileDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Key { get; set; } = string.Empty;

        public string ContentType { get; set; } = string.Empty;

        public string BucketName { get; set; } = string.Empty;

        public long SizeInBytes { get; set; }

        public DateTime UploadedAt { get; set; }

        public string Url { get; set; } = string.Empty;
    }
}
