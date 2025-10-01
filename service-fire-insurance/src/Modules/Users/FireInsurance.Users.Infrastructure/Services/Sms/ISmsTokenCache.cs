namespace FireInsurance.Users.Infrastructure.Services.Sms;

public interface ISmsTokenCache
{
    /// <summary>
    /// Gets the cached token if available
    /// </summary>
    /// <returns>The cached token or null if not found or expired</returns>
    Task<string?> GetTokenAsync();

    /// <summary>
    /// Stores a token in the cache with expiration
    /// </summary>
    /// <param name="token">The token to cache</param>
    /// <param name="expiresAt">When the token expires</param>
    Task SetTokenAsync(string token, DateTime expiresAt);
}
