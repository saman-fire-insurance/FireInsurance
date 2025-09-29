using Ardalis.Result;

namespace FireInsurance.Identity.Application.Services
{
    public interface ISmsService
    {
        Task<Result> SendCodeAsync(string phoneNumber, string code);

        Task<Result> SendIssuedPolicyLinkAsync(string phoneNumber, string serialNumber);

        Task<Result> SendZombiePolicyNotificationAsync(string phoneNumber, string serialNumber);

        Task<Result> SendMessageAsync(string phoneNumber, string link);
    }
}
