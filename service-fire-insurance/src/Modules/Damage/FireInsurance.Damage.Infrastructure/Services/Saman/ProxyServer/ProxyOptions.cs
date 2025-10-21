using System.ComponentModel.DataAnnotations;

namespace FireInsurance.Damage.Infrastructure.Services.Saman.ProxyServer;

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
