using FireInsurance.Damage.Domain.Common;

namespace FireInsurance.Damage.Domain.Entities
{
    public class DamagedObject : BaseEntity
    {
        public Guid ClaimId { get; set; }
        public DamageClaim DamageClaim { get; set; }
        public Guid InsurableObjectId { get; set; }
        public InsurableObject InsurableObject { get; set; }
        public Guid CoverageId { get; set; }
        //public Coverage Coverage { get; set; }
        public string? Description { get; set; }
        public decimal EstimatedLoss { get; set; }
    }
}
