using System.ComponentModel.DataAnnotations;

namespace FireInsurance.Damage.Infrastructure.Services.Saman.SmsService;

public sealed class SmsProviderOptions
{
    [Required]
    [Url]
    public required string BaseUrl { get; set; }

    [Required]
    public required string Username { get; set; }

    [Required]
    public required string Password { get; set; }

    [Required]
    [Url]
    public required string MessageUrl { get; set; }

    [Required]
    [Url]
    public required string StageMessageUrl { get; set; }

    //[Required]
    //public string UserDomain { get; set; }

    //[Required]
    //public string AdminDomain { get; set; }

    public int AuthTokenExpiryInHours { get; set; } = 6;
}
