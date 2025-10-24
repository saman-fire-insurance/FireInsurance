using FireInsurance.Damage.Domain.Entities;

namespace FireInsurance.Damage.Application.Dtos
{
    public class DamagedObjectDto : BaseDto
    {
        public Guid DamageClaimId { get; set; }
        public InsurableObjectDto InsurableObject { get; set; } = null!;
        //public CoverageDto Coverage { get; set; }
        public string? Description { get; set; }
        public decimal EstimatedLoss { get; set; }
    }
}
