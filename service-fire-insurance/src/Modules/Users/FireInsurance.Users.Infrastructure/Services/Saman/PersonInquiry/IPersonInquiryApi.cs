using FireInsurance.Users.Application.Dtos.SamanService;
using Refit;

namespace FireInsurance.Users.Infrastructure.Services.Saman.PersonInquiry
{
    public interface IPersonInquiryApi
    {
        [Post("/desktopmodules/bimesaman/service/V6/SamanService.svc/InquiryInformation")]
        //Task<SamanResultDto<PersonInquiryResponse>> GetPersonInfoAsync([Body] PersonInquiryRequest request);
        Task<ApiResponse<SamanResultDto<PersonInquiryResponse>>> GetPersonInfoAsync([Body] PersonInquiryRequest request);
    }
}
