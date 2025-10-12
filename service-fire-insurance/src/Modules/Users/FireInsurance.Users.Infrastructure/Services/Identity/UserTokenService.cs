using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using JwtRegisteredClaimNames = System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames;

namespace FireInsurance.Users.Infrastructure.Services.Identity;

public class UserTokenService// : RefreshTokenService<TokenRequest, TokenResponse>
{
    //private readonly UserManager<User> _userManager;

    //public UserTokenService(
    //    JwtOptions jwtOptions,
    //    UserManager<User> userManager)
    //{
    //    Setup(options =>
    //    {
    //        options.TokenSigningKey = Base64Encoding.Encode(jwtOptions.SigningKey);
    //        options.AccessTokenValidity = TimeSpan.FromDays(1);
    //        options.RefreshTokenValidity = TimeSpan.FromDays(7);

    //        options.Endpoint("/auth/refresh-token", ep => { });
    //    });

    //    _userManager = userManager;
    //}

    //public override async Task PersistTokenAsync(TokenResponse response)
    //{
    //    if (string.IsNullOrWhiteSpace(response.UserId))
    //    {
    //        return;
    //    }

    //    var user = await _userManager.FindByIdAsync(response.UserId);
    //    if (user is null)
    //    {
    //        return;
    //    }

    //    //var refreshTokenHash = BCrypt.Net.BCrypt.HashPassword(response.RefreshToken);
    //    var result = await _userManager.SetAuthenticationTokenAsync(
    //        user,
    //        TokenOptions.DefaultProvider,
    //        "RefreshToken",
    //        response.RefreshToken);

    //    if (!result.Succeeded)
    //    {
    //        AddError("Failed to save refresh token.");
    //    }
    //}

    //public override async Task RefreshRequestValidationAsync(TokenRequest req)
    //{
    //    var user = await _userManager.FindByIdAsync(req.UserId);

    //    if (user is null)
    //    {
    //        return;
    //    }

    //    var savedToken = await _userManager.GetAuthenticationTokenAsync(
    //    user,
    //    TokenOptions.DefaultProvider,
    //    "RefreshToken");

    //    if (savedToken != req.RefreshToken)
    //    {
    //        AddError("Invalid refresh token.");
    //    }
    //}

    //public override async Task SetRenewalPrivilegesAsync(
    //    TokenRequest request,
    //    UserPrivileges privileges)
    //{
    //    var user = await _userManager.FindByIdAsync(request.UserId);

    //    if (user is null)
    //    {
    //        return;
    //    }

    //    var jti = Guid.NewGuid().ToString();

    //    privileges.Claims.Clear();
    //    privileges.Claims.Add(new Claim(JwtRegisteredClaimNames.Sub, request.UserId));
    //    privileges.Claims.Add(new Claim(JwtRegisteredClaimNames.Jti, jti));

    //    //var roles = await _userManager.GetRolesAsync(user);
    //    //foreach (var role in roles)
    //    //{
    //    //    privileges.Claims.Add(new Claim(ClaimTypes.Role, role));
    //    //}
    //}
}
