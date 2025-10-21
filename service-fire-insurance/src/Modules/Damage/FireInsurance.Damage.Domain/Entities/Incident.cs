using Ardalis.Result;
using FireInsurance.Damage.Domain.Common;
using Mapster;
using System.ComponentModel.DataAnnotations;

namespace FireInsurance.Damage.Domain.Entities
{
    [AdaptTo("[name]Dto"), GenerateMapper]
    public class Incident : BaseEntity
    {
        public Guid IncidentTypeId { get; set; }
        public IncidentType? IncidentType { get; set; }
        public DateTime OccuranceDate { get; set; }
        public Province Province { get; set; }
        public City City { get; set; }
        public string Address { get; set; } = string.Empty;
        public string PostalCode { get; set; }
        public OwnershipType OwnershipType { get; set; }

        [MinLength(10), MaxLength(1000)]
        public required string IncidentCause { get; set; }
        public string RestraintDescription { get; set; } = string.Empty;

        public List<Guid>? IncidentImageFileIds { get; set; }
        public List<StoredFile>? IncidentImageFiles { get; set; }

        public static Result<Incident> Create(
            DateTime occuranceDate,
            IncidentType incidentType,
            Province province,
            City city,
            string address,
            string postalCode,
            OwnershipType ownershipType,
            string incidentCause,
            string? restraintDescription = null,
            List<Guid>? incidentImageFileIds = null)
        {
            var createdIncident = new Incident
            {
                IncidentType = incidentType,
                OccuranceDate = occuranceDate,
                Province = province,
                City = city,
                Address = address,
                PostalCode = postalCode,
                OwnershipType = ownershipType,
                IncidentCause = incidentCause,
                RestraintDescription = restraintDescription ?? string.Empty,
                IncidentImageFileIds = incidentImageFileIds
            };

            return Result.Success(createdIncident);
        }
    }
}
