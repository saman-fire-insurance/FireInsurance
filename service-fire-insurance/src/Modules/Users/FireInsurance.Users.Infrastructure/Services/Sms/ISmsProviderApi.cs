using Refit;
using System.Text.Json.Serialization;

namespace FireInsurance.Users.Infrastructure.Services.Sms
{
    public interface ISmsProviderApi
    {
        [Post("/api/ControlInformation/sendMessage")]
        Task<SmsResponse> SendSmsAsync(SmsRequestWrapper request);
    }

    public class SmsRequest
    {
        [JsonPropertyName("SmsBody")]
        public string SmsBody { get; set; } = string.Empty;
        [JsonPropertyName("Mobile")]
        public string Mobile { get; set; } = string.Empty;
        [JsonPropertyName("customerId")]
        public long? CustomerId { get; set; }
    }

    public class SmsRequestWrapper
    {
        [JsonPropertyName("request")]
        public SmsRequest Request { get; set; } = new();

        [JsonPropertyName("SmsBody")]
        public string SmsBody { get; set; } = string.Empty;
        [JsonPropertyName("Mobile")]
        public string Mobile { get; set; } = string.Empty;
    }

    public class SmsResponse
    {
        [JsonPropertyName("code")]
        public int Code { get; set; }

        [JsonPropertyName("message")]
        public string Message { get; set; } = string.Empty;

        [JsonPropertyName("result")]
        public SmsResult Result { get; set; } = new();
    }

    public class SmsResult
    {
        [JsonPropertyName("serverId")]
        public long ServerId { get; set; }

        [JsonPropertyName("registerDate")]
        public DateTimeOffset RegisterDate { get; set; }
    }
}
