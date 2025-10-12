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

    public int AccessTokenExpirationInMinutes { get; set; } = 60;

    public int RefreshTokenExpirationInDays { get; set; } = 1;
}
