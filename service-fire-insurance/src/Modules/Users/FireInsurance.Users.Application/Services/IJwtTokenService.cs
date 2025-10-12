using FireInsurance.Users.Application.UseCases.Commands;
using FireInsurance.Users.Domain.Entities;

namespace FireInsurance.Users.Application.Services
{
    public interface IJwtTokenService
    {
        Task<TokenDto> GenerateTokenAsync(User user, CancellationToken cancellationToken = default);
        Task<TokenDto> RefreshTokenAsync(string refreshToken, CancellationToken cancellationToken = default);
        Task RevokeTokenAsync(string jti, DateTime expiration, CancellationToken cancellationToken = default);
    }
}
