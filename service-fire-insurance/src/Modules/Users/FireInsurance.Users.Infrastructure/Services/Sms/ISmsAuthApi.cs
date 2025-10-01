using Refit;
using System.Text.Json.Serialization;

namespace FireInsurance.Users.Infrastructure.Services.Sms;

public interface ISmsAuthApi
{
    [Post("/api/auth/login")]
    Task<TokenResponse> GetTokenAsync([Body] TokenRequest request);
}

public class TokenRequest
{
    [JsonPropertyName("userName")]
    public string UserName { get; set; } = string.Empty;

    [JsonPropertyName("password")]
    public string Password { get; set; } = string.Empty;
}

public class TokenResponse
{
    [JsonPropertyName("code")]
    public int Code { get; set; }

    [JsonPropertyName("message")]
    public string Message { get; set; } = string.Empty;
    [JsonPropertyName("result")]
    public string Result { get; set; } = string.Empty;
}
