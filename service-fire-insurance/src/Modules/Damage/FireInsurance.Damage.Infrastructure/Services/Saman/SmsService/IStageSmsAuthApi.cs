using Refit;
using System.Text.Json.Serialization;

namespace FireInsurance.Damage.Infrastructure.Services.Saman.SmsService;

public interface IStageSmsAuthApi
{
    [Get("/api/v1/users/authenticate")]
    Task<StageTokenResponse> GetTokenAsync(
        [Query] string username,
        [Query] string password);
}

public class StageTokenResponse
{
    [JsonPropertyName("userName")]
    public string UserName { get; set; } = string.Empty;

    [JsonPropertyName("token")]
    public string Token { get; set; } = string.Empty;

    [JsonPropertyName("expirtTime")]
    public DateTime ExpirtTime { get; set; }
}
//    public class TokenResponse
//{
//    [JsonPropertyName("code")]
//    public int Code { get; set; }

//    [JsonPropertyName("message")]
//    public string Message { get; set; } = string.Empty;
//    [JsonPropertyName("result")]
//    public string Result { get; set; } = string.Empty;
//}
