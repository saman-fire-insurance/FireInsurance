using Ardalis.Result;
using FireInsurance.Users.Application.Dtos.SamanService;
using FireInsurance.Users.Application.Services;

namespace FireInsurance.Users.Infrastructure.Mocks
{
    public class MockPersonInquiryService : IPersonInquiryService
    {
        public Task<Result<PersonInquiryResponse>> GetPersonInfoAsync(string nationalCode, string birthDate)
        {
            var mockCity = new LocationInfo
            {
                Id = 1,
                Code = "021",
                Name = "تهران"
            };

            var mockState = new LocationInfo
            {
                Id = 2,
                Code = "021",
                Name = "تهران"
            };

            return Task.FromResult<Result<PersonInquiryResponse>>(new PersonInquiryResponse
            {
                FirstName = "تستعلی",
                LastName = "تستی پور",
                FatherName = "آزمون",
                Gender = true,
                Address = "تهران، کوچه اول، پلاک 1",
                City = mockCity,
                State = mockState,
            });
        }
    }
}
