using Ardalis.Result;
using FireInsurance.Users.Application.Dtos.SamanService;

namespace FireInsurance.Users.Application.Services
{
    public interface IPersonInquiryService
    {
        Task<Result<PersonInquiryResponse>> GetPersonInfoAsync(string nationalCode, string birthDate);
        //Task<Result> ApplyInquiryResultToUser(PersonInquiryResponse response);
    }
}
