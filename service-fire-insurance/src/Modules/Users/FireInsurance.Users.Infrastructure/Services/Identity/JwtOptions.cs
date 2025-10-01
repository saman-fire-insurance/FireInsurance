using System.ComponentModel.DataAnnotations;

namespace FireInsurance.Users.Infrastructure.Services.Identity;

public sealed class JwtOptions
{
    [Required]
    public required string Audience { get; set; }

    [Required]
    public required string SigningKey { get; set; }

    [Required]
    public required string Issuer { get; set; }
}
