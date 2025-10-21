using Refit;
using System.Text.Json.Serialization;

namespace FireInsurance.Damage.Infrastructure.Services.Saman.SmsService
{
    public interface IStageSmsProviderApi
    {
        [Get("/api/v3/SMS/Send")]
        Task<StageSmsResponse> SendSmsAsync(
            [Query] string Body,
            [Query] string Recipient,
            [Query] string CustomerId);
    }

    public class StageSmsResponse
    {
        [JsonPropertyName("errors")]
        public Dictionary<string, string> Errors { get; set; } = [];

        [JsonPropertyName("response")]
        public ResponseData Response { get; set; } = new();

        public class ResponseData
        {
            [JsonPropertyName("code")]
            public int Code { get; set; }

            [JsonPropertyName("message")]
            public string Message { get; set; } = string.Empty;

            [JsonPropertyName("data")]
            public List<StageSmsResult> Data { get; set; } = [];
        }

        public class StageSmsResult
        {
            [JsonPropertyName("serverId")]
            public long ServerId { get; set; }

            [JsonPropertyName("customerId")]
            public long CustomerId { get; set; }

            [JsonPropertyName("mobile")]
            public string Mobile { get; set; } = string.Empty;
        }
    }
}
