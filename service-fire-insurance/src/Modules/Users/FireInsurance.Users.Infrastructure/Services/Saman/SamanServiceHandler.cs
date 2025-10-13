using Microsoft.Extensions.Logging;
using System.Text;

namespace FireInsurance.Users.Infrastructure.Services.Saman
{
    public class SamanServiceHandler(ILogger<SamanServiceHandler> logger, SamanServicesOptions options) : DelegatingHandler
    {
        protected override async Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            request.Headers.Add("Key", options.Key);
            return await base.SendAsync(request, cancellationToken);
        }
    
    private static string BuildCurlCommand(HttpRequestMessage request)
        {
            var sb = new StringBuilder();
            sb.Append("curl -X ");
            sb.Append(request.Method);
            sb.Append(" \"");
            sb.Append(request.RequestUri);
            sb.Append("\"");

            foreach (var header in request.Headers)
            {
                foreach (var value in header.Value)
                {
                    sb.Append(" -H \"");
                    sb.Append(header.Key);
                    sb.Append(": ");
                    sb.Append(value);
                    sb.Append("\"");
                }
            }

            if (request.Content != null)
            {
                var content = request.Content.ReadAsStringAsync().Result;
                sb.Append(" -d '");
                sb.Append(content);
                sb.Append("'");
            }

            return sb.ToString();
        }
    }
}
