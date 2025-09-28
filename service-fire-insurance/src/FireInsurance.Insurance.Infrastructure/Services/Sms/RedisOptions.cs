using System.ComponentModel.DataAnnotations;

namespace FireInsurance.Insurance.Infrastructure.Services.Sms;

public sealed class RedisOptions
{
    [Required]
    public required string ConnectionString { get; set; }

    /// <summary>
    /// Optional instance name to differentiate between multiple Redis instances
    /// </summary>
    public string? InstanceName { get; set; }
}
