using FireInsurance.Insurance.Application.Services;

namespace FireInsurance.Insurance.Infrastructure.Mocks
{
    public sealed class FakeSmsService() : ISmsService
    {
        public async Task<bool> SendCodeAsync(string phoneNumber, long code, bool isAdmin = false)
        {
            return await Task.FromResult(true);
        }

        public Task<bool> SendIssuedPolicyLinkAsync(string phoneNumber, string link)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SendMessageAsync(string phoneNumber, string link)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SendZombiePolicyNotificationAsync(string phoneNumber, string link)
        {
            throw new NotImplementedException();
        }
    }
}
