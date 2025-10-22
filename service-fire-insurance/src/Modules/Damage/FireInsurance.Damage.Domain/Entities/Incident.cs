using Ardalis.Result;
using FireInsurance.Damage.Domain.Common;
using FireInsurance.Damage.Domain.Enums;
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

        public bool HasPoliceReport { get; set; }
        public string? PoliceReportNumber { get; set; }
        public DateTime? PoliceReportDate { get; set; }
        public List<Guid>? PoliceReportFileIds { get; set; }
        public List<StoredFile>? PoliceReportFiles { get; set; }

        public bool HasFireStationReport { get; set; }
        public string? FireStationName { get; set; }
        public List<Guid>? FireStationReportFileIds { get; set; }
        public List<StoredFile>? FireStationReportFiles { get; set; }

        public bool HasWeatherReport { get; set; }
        public WeatherCondition? WeatherCondition { get; set; }
        public Probability? WeatherReportProbability { get; set; }

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
            List<Guid>? incidentImageFileIds = null,
            bool hasPoliceReport = false,
            string? policeReportNumber = null,
            DateTime? policeReportDate = null,
            List<Guid>? policeReportFileIds = null,
            bool hasFireStationReport = false,
            string? fireStationName = null,
            List<Guid>? fireStationReportFileIds = null,
            bool hasWeatherReport = false,
            WeatherCondition? weatherCondition = null,
            Probability? weatherReportProbability = null)
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
                IncidentImageFileIds = incidentImageFileIds,
                HasPoliceReport = hasPoliceReport,
                PoliceReportNumber = policeReportNumber,
                PoliceReportDate = policeReportDate,
                PoliceReportFileIds = policeReportFileIds,
                HasFireStationReport = hasFireStationReport,
                FireStationName = fireStationName,
                FireStationReportFileIds = fireStationReportFileIds,
                HasWeatherReport = hasWeatherReport,
                WeatherCondition = weatherCondition,
                WeatherReportProbability = weatherReportProbability
            };

            return Result.Success(createdIncident);
        }
    }
}
