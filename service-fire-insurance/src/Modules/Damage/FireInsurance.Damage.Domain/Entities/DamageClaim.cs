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
        public Insurer? Insurer { get; set; } = null;
        public string? SerialNumber { get; set; }
        public string? Code { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public List<Guid>? InsuranceFileIds { get; set; }
        public List<StoredFile> InsuranceFiles { get; set; } = [];
        public Guid? IncidentId { get; set; } = null;
        public Incident? Incident { get; set; }
        public List<DamagedObject> DamagedObjects { get; set; } = [];
        public Guid? OwnershipTypeId { get; set; } = null;
        public OwnershipType? OwnershipType { get; set; }
        public List<Guid>? StakeHolderIds { get; set; } = null;
        public List<StakeHolder>? StakeHolders { get; set; } = [];
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
                Status = DamageClaimStatus.Insurance,
                Insurer = insurer,
                // Add first StakeHolder
            };

            return createdClaim;
        }

        public Result<DamageClaim> AddInsuranceInfo(string serialNumber, List<Guid>? fileIds, ThirdPartyCoverage? thirdPartyCoverage)
        {
            SerialNumber = serialNumber;
            
            if (fileIds?.Count > 0)
            {
                InsuranceFileIds = fileIds;
            }
            
            if (thirdPartyCoverage != null)
            {
                ThirdPartyCoverage = thirdPartyCoverage;
            }

            Status = DamageClaimStatus.Incident;

            return Result.Success(this);
        }

        public Result<DamageClaim> AddIncidentInfo(Incident incident)
        {
            //validations if any
            if (incident == null)
            {
                return Result.Error("Incident information cannot be null.");
            }

            Incident = incident;
            Status = DamageClaimStatus.DamagedObjects;

            return Result.Success(this);
        }

        public Result<DamageClaim> AddDamagedObjects(List<DamagedObject> damagedObjects)
        {
            if (damagedObjects == null || damagedObjects.Count == 0)
            {
                return Result.Error("Damaged objects list cannot be null or empty.");
            }

            DamagedObjects = damagedObjects;
            Status = DamageClaimStatus.StakeHolder;

            return Result.Success(this);
        }

        public Result<DamageClaim> AddStakeHolders(List<StakeHolder> stakeHolders)
        {
            if (stakeHolders == null || stakeHolders.Count == 0)
            {
                return Result.Error("Stakeholders list cannot be null or empty.");
            }

            StakeHolders = stakeHolders;
            StakeHolderIds = [.. stakeHolders.Select(sh => sh.Id)];
            Status = DamageClaimStatus.Pending;

            return Result.Success(this);
        }
    }
}
