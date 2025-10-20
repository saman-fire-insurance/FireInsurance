using FireInsurance.Damage.Domain.Entities;

namespace FireInsurance.Damage.Application.Dtos
{

    public class ThirdPartyCoverageDto : BaseDto
    {
        public required string CompanyName { get; set; }
        public required string PolicyNumber { get; set; }
        public required InsurableObject InsurableObject { get; set; }
    }
}
