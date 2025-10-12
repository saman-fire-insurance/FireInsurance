using Ardalis.Result;
using FireInsurance.Users.Application.Services;

namespace FireInsurance.Users.Infrastructure.Mocks
{
    public sealed class MockSmsService() : ISmsService
    {
        public async Task<Result> SendCodeAsync(string phoneNumber, string code)
        {
            return await Task.FromResult(Result.Success());
        }

        public async Task<Result> SendIssuedPolicyLinkAsync(string phoneNumber, string link)
        {
            return await Task.FromResult(Result.Success());
        }

        public async Task<Result> SendMessageAsync(string phoneNumber, string link)
        {
            return await Task.FromResult(Result.Success());
        }

        public async Task<Result> SendZombiePolicyNotificationAsync(string phoneNumber, string link)
        {
            return await Task.FromResult(Result.Success());
        }
    }
}
