using FireInsurance.Damage.Domain.Common;
using Mapster;

namespace FireInsurance.Damage.Domain.Entities
{
    [AdaptTo("[name]Dto"), GenerateMapper]
    public class ThirdPartyCoverage : BaseEntity
    {
        public required string CompanyName { get; set; }
        public required string PolicyNumber { get; set; }
        public required InsurableObject InsurableObject { get; set; }
    }
}
