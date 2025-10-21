using Ardalis.Result;
using Mapster;
using FireInsurance.Damage.Domain.Common;
using FireInsurance.Damage.Domain.Enums;

namespace FireInsurance.Damage.Domain.Entities
{
    [AdaptTo("[name]Dto"), GenerateMapper]
    public class DamageClaim : BaseEntity
    {
        public string UserId { get; set; }
        public Insurer Insurer { get; set; } = null;
        public string? SerialNumber { get; set; }
        public string? Code { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public List<Guid>? FileIds { get; set; }
        //public List<FileEntity> Files { get; set; }
        public Guid? IncidentId { get; set; } = null;
        //public Incident? Incident { get; set; }
        //public List<DamagedObject>? DamagedObjects { get; set; }
        public Guid? OwnershipTypeId { get; set; } = null;
        //public OwnershipType? OwnershipType { get; set; }
        public Guid? StakeHolderId { get; set; } = null;
        //public StakeHolder? StakeHolder { get; set; }
        public DamageClaimStatus Status { get; set; }
        public ThirdPartyCoverage? ThirdPartyCoverage { get; set; } = null;

        public static Result<DamageClaim> Create(string userId, string phoneNumber, string firstName, string lastName)
        {
            var insurer = new Insurer
            {
                FirstName = firstName,
                LastName = lastName,
                PhoneNumber = phoneNumber
            };

            var createdClaim = new DamageClaim
            {
                UserId = userId,
                PhoneNumber = phoneNumber,
                Status = DamageClaimStatus.IncidentInfo,
                Insurer = insurer
            };

            return createdClaim;
        }

        public Result<DamageClaim> AddInsuranceInfo(string serialNumber, List<Guid>? fileIds, ThirdPartyCoverage? thirdPartyCoverage)
        {
            SerialNumber = serialNumber;
            
            if (fileIds?.Count > 0)
            {
                FileIds = fileIds;
            }
            
            if (thirdPartyCoverage != null)
            {
                ThirdPartyCoverage = thirdPartyCoverage;
            }

            return Result.Success(this);
        }
    }
}
