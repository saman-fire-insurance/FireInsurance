namespace FireInsurance.Damage.Application.Dtos
{
    public class DamageClaimDto : BaseDto
    {
        public string SerialNumber { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public List<Guid> FileIds { get; set; } = [];
        
        public Guid IncidentId { get; set; }
        public IncidentDto Incident { get; set; } = null!;
        
        public List<DamagedObjectDto> DamagedObjects { get; set; } = [];
        
        public IncidentTypeDto IncidentType { get; set; }
        public string IncidentCause { get; set; } = string.Empty;
        public string SuppressionAction { get; set; } = string.Empty;
        
        public Guid OwnershipTypeId { get; set; }
        public OwnershipTypeDto OwnershipType { get; set; } = null!;
        
        public Guid? StakeHolderId { get; set; }
        public StakeHolderDto? StakeHolder { get; set; }
    }
}
