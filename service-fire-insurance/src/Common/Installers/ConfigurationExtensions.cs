using Microsoft.Extensions.Configuration;
using System.Web;
using System;

namespace Common.Installers;

public static class ConfigurationExtensions
{
    public static bool IsValidReturnUrl(string returnUrl)
    {
        if (string.IsNullOrWhiteSpace(returnUrl) || returnUrl == "/" || returnUrl == "~/")
            return false;

        try
        {
            var uri = new Uri(returnUrl, UriKind.RelativeOrAbsolute);

            // If the URL is relative, it's considered valid
            if (!uri.IsAbsoluteUri)
                return true;

            // Check if the host is localhost or shilafood.co (with or without subdomains)
            return (uri.Host.Equals("localhost", StringComparison.OrdinalIgnoreCase) ||
                    uri.Host.EndsWith(".localhost", StringComparison.OrdinalIgnoreCase) ||
                    uri.Host.Equals("shilafood.co", StringComparison.OrdinalIgnoreCase) ||
                    uri.Host.EndsWith(".shilafood.co", StringComparison.OrdinalIgnoreCase));
        }
        catch
        {
            return false;
        }
    }
    public static string GetRequiredValue(this IConfiguration configuration, string name)
    {
        var message = $"Configuration missing value for: {(configuration is IConfigurationSection s ? s.Path + ":" + name : name)}";

        return configuration[name] ?? throw new InvalidOperationException(message);
    }

    public static string GetDefaultReturnUrl(this IConfiguration configuration, string returnUrl = null)
    {
        if (IsValidReturnUrl(returnUrl))
        {
            returnUrl = HttpUtility.UrlDecode(returnUrl);
            return returnUrl;
        }

        var section = configuration.GetRequiredSection("WebAppSettings") ?? throw new InvalidOperationException("WebAppSettings is not provided.");

        var baseUrl = section.GetRequiredValue("BaseUrl");

        if (string.IsNullOrWhiteSpace(baseUrl))
        {
            throw new InvalidOperationException("WebAppSettings:BaseUrl is not provided.");
        }

        return baseUrl;
    }
}
