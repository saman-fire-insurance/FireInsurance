using System.Security.Claims;

namespace Common.Interfaces
{
    public interface IClaimsProvider
    {
        IEnumerable<Claim> Claims { get; }

        string? UserId { get; }

        bool IsAdmin { get; }
    }
}
