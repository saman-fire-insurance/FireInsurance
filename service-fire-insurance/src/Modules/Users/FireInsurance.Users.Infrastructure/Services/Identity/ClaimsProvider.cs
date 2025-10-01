using Common.Constants;
using Common.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace FireInsurance.Users.Infrastructure.Services.Identity;

public class ClaimsProvider(IHttpContextAccessor httpContextAccessor) : IClaimsProvider
{
    public IEnumerable<Claim> Claims => httpContextAccessor.HttpContext?.User?.Claims ?? [];

    public string? UserId => Claims.FirstOrDefault(c => c.Type == "sub")?.Value;

    public bool IsAdmin => Claims.FirstOrDefault(c => c.Type == CustomClaimType.IsAdmin)?.Value == true.ToString();
}
