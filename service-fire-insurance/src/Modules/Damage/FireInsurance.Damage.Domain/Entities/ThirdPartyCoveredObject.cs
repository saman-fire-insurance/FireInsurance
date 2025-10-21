using FireInsurance.Damage.Domain.Common;

namespace FireInsurance.Damage.Domain.Entities
{
    public class ThirdPartyCoveredObject : BaseEntity
    {
        public Guid ThirdPartyCoverageId { get; set; }
        public ThirdPartyCoverage? ThirdPartyCoverage { get; set; }
        public Guid InsurableObjectId { get; set; }
        public InsurableObject? InsurableObject { get; set; }
    }
}
