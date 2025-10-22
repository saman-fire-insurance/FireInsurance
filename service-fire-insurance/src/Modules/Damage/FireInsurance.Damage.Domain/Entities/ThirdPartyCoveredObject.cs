using FireInsurance.Damage.Domain.Common;
using Mapster;

namespace FireInsurance.Damage.Domain.Entities
{
    [AdaptTo("[name]Dto"), GenerateMapper]
    public class ThirdPartyCoveredObject : BaseEntity
    {
        public Guid ThirdPartyCoverageId { get; set; }
        public ThirdPartyCoverage? ThirdPartyCoverage { get; set; }
        public Guid InsurableObjectId { get; set; }
        public InsurableObject? InsurableObject { get; set; }
    }
}
