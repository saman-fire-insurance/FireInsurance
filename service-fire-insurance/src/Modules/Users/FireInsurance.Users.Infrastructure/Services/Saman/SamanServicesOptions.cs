using System.ComponentModel.DataAnnotations;

namespace FireInsurance.Users.Infrastructure.Services.Saman
{
    public sealed class SamanServicesOptions
    {
        [Url]
        public required string BaseUrl { get; set; }

        public required string Key { get; set; }
    }
}
