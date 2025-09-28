using System.ComponentModel.DataAnnotations;

namespace FireInsurance.Insurance.Infrastructure.Services.Notification;

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
