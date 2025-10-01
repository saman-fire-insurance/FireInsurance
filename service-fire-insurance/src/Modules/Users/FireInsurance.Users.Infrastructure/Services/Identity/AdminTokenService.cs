using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.JsonWebTokens;
using System.Security.Claims;

namespace FireInsurance.Users.Infrastructure.Services.Identity;

public class AdminTokenService //: RefreshTokenService<TokenRequest, TokenResponse>
{
    //private readonly UserManager<User> _userManager;
    //private readonly IPermissionsService _permissionsService;

    //public AdminTokenService(
    //    JwtOptions jwtOptions,
    //    UserManager<User> userManager,
    //    IPermissionsService permissionsService)
    //{
    //    Setup(options =>
    //    {
    //        options.TokenSigningKey = Base64Encoding.Encode(jwtOptions.SigningKey);
    //        options.AccessTokenValidity = TimeSpan.FromHours(1);
    //        options.RefreshTokenValidity = TimeSpan.FromDays(7);

    //        options.Endpoint("/admins/refresh-token", ep => { });
    //    });

    //    _userManager = userManager;
    //    _permissionsService = permissionsService;
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

    //    var result = await _userManager.SetAuthenticationTokenAsync(
    //        user,
    //        "Default",
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


    //    var permissions = _permissionsService
    //        .GetAsync(user)
    //        .GetAwaiter()
    //        .GetResult()
    //        .Select(p => p.Value);

    //    privileges.Permissions.Clear();
    //    privileges.Permissions.AddRange(permissions);
    //}
}
