namespace FireInsurance.Damage.Application.Dtos
{
    public class DamagedObjectDto : BaseDto
    {
        public Guid DamageClaimId { get; set; }
        public DamageClaimDto DamageClaim { get; set; }
        public Guid InsurableObjectId { get; set; }
        public InsurableObjectDto InsurableObject { get; set; } = null!;
        public Guid CoverageId { get; set; }
        //public CoverageDto Coverage { get; set; }
        public string? Description { get; set; }
        public decimal EstimatedLoss { get; set; }
    }
}
