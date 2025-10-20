using FireInsurance.Damage.Domain.Common;

namespace FireInsurance.Damage.Domain.Entities
{
    public class Incident : BaseEntity
    {
        public DateTime OccuranceDate { get; set; }
        public string Location { get; set; } = string.Empty;
        public Guid IncidentTypeId { get; set; }
        public IncidentType? IncidentType { get; set; }
        public required string IncidentCause { get; set; }
        public string RestraintDescription { get; set; } = string.Empty;
    }
}
