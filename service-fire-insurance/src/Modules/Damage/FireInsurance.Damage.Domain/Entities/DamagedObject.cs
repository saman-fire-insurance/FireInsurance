using Ardalis.Result;
using FireInsurance.Damage.Domain.Common;
using Mapster;

namespace FireInsurance.Damage.Domain.Entities
{
    [AdaptTo("[name]Dto"), GenerateMapper]
    public class DamagedObject : BaseEntity
    {
        public Guid DamageClaimId { get; set; }
        public DamageClaim? DamageClaim { get; set; }
        public Guid InsurableObjectId { get; set; }
        public InsurableObject? InsurableObject { get; set; }
        public Guid? CoverageId { get; set; } = null;
        //public Coverage Coverage { get; set; }
        public string? Description { get; set; }
        public decimal EstimatedLoss { get; set; }

        public static Result<DamagedObject> Create(
            Guid damageClaimId,
            InsurableObject insurableObject,
            decimal estimatedLoss,
            string? description,
            Guid? coverageId = null)
        {
            // Validate Description requirement for "Other" insurable objects
            if (insurableObject.Other && string.IsNullOrWhiteSpace(description))
            {
                return Result.Error($"Description is required for InsurableObject '{insurableObject.Title}' (ID: {insurableObject.Id}).");
            }

            // Validate EstimatedLoss
            if (estimatedLoss <= 0)
            {
                return Result.Error("EstimatedLoss must be greater than 0.");
            }

            var damagedObject = new DamagedObject
            {
                DamageClaimId = damageClaimId,
                InsurableObjectId = insurableObject.Id,
                InsurableObject = insurableObject,
                EstimatedLoss = estimatedLoss,
                Description = description,
                CoverageId = coverageId
            };

            return Result.Success(damagedObject);
        }
    }
}
