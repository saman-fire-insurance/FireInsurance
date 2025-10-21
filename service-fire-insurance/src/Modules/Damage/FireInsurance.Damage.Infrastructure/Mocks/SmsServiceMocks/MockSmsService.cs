using FireInsurance.Damage.Application.Services.SamanServices.SmsService;

namespace FireInsurance.Damage.Infrastructure.Mocks.SmsServiceMocks;

public sealed class MockSmsService() : ISmsService
{
    public async Task<bool> SendMessageAsync(string phoneNumber, string link)
    {
        return await Task.FromResult(true);
    }

    public async Task<bool> SendSubmittedClaimConfirmationAsync(string phoneNumber, string serialNumber)
    {
        return await Task.FromResult(true);
    }

    public async Task<bool> SendZombiePolicyNotificationAsync(string phoneNumber, Guid id)
    {
        return await Task.FromResult(true);
    }
}
