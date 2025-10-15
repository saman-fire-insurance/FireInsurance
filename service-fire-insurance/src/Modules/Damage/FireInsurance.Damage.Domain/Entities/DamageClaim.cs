using Ardalis.Result;
using FireInsurance.Damage.Domain.Common;
using FireInsurance.Damage.Domain.Enums;

namespace FireInsurance.Damage.Domain.Entities
{
    public class DamageClaim : BaseEntity
    {
        public Guid UserId { get; set; }
        //public Insurer Insurer { get; set; }
        public string? SerialNumber { get; set; }
        public string? Code { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public List<Guid>? FileIds { get; set; }
        //public List<FileEntity> Files { get; set; }
        public Guid? IncidentId { get; set; }
        public Incident? Incident { get; set; }
        public List<DamagedObject>? DamagedObjects { get; set; }
        public Guid? OwnershipTypeId { get; set; }
        public OwnershipType? OwnershipType { get; set; }
        public Guid? StakeHolderId { get; set; }
        public StakeHolder? StakeHolder { get; set; }
        public DamageClaimStatus Status { get; set; }
        //public ThirdPartyInsurableObject ThirdPartyInsurableObject { get; set; }

        public static Result<DamageClaim> Create(Guid userId, string phoneNumber)
        {
            var createdClaim = new DamageClaim
            {
                UserId = userId,
                PhoneNumber = phoneNumber,
                Status = DamageClaimStatus.IncidentInfo
            };

            return createdClaim;
        }
    }
}
