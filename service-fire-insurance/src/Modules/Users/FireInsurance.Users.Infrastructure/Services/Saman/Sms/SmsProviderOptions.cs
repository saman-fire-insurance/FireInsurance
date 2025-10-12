using System.ComponentModel.DataAnnotations;

namespace FireInsurance.Users.Infrastructure.Services.Saman.Sms;

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
}
