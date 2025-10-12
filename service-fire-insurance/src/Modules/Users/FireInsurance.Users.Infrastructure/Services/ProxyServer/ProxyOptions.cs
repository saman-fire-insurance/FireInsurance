using System.ComponentModel.DataAnnotations;

namespace FireInsurance.Users.Infrastructure.Services.ProxyServer;

public sealed class ProxyOptions
{
    [Required]
    [Url]
    public required string Address { get; set; }

    [Required]
    public required string Password { get; set; }

    [Required]
    public required string User { get; set; }
}
