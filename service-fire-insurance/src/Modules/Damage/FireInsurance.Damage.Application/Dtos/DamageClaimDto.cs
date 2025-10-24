using FireInsurance.Damage.Domain.Enums;

namespace FireInsurance.Damage.Application.Dtos
{
    public class DamageClaimDto : BaseDto
    {
        public string UserId { get; set; } = string.Empty;
        public InsurerDto? Insurer { get; set; } = null;
        public string? SerialNumber { get; set; }
        public string? Code { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public DamageClaimStatus Status { get; set; }

        public List<Guid>? InsuranceFileIds { get; set; }
        public List<StoredFileDto>? InsuranceFiles { get; set; }

        public Guid? IncidentId { get; set; }
        public IncidentDto? Incident { get; set; }

        public List<DamagedObjectDto> DamagedObjects { get; set; } = [];

        public Guid? OwnershipTypeId { get; set; }
        public OwnershipTypeDto? OwnershipType { get; set; }

        public List<Guid> StakeHolderIds { get; set; } = [];
        public List<StakeHolderDto> StakeHolders { get; set; } = [];

        public ThirdPartyCoverageDto? ThirdPartyCoverage { get; set; }
    }
}
