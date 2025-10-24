using FireInsurance.Damage.Domain.Entities;
using FireInsurance.Damage.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Damage.Application.Dtos
{
    public class IncidentDto : BaseDto
    {
        public Guid IncidentTypeId { get; set; }
        public IncidentTypeDto? IncidentType { get; set; }
        public DateTime OccuranceDate { get; set; }
        public ProvinceDto Province { get; set; }
        public CityDto City { get; set; }
        public string Address { get; set; } = string.Empty;
        public string PostalCode { get; set; }
        public OwnershipTypeDto OwnershipType { get; set; }
        public required string IncidentCause { get; set; }
        public string RestraintDescription { get; set; } = string.Empty;

        // Police Report
        public bool HasPoliceReport { get; set; }
        public string? PoliceReportNumber { get; set; }
        public DateTime? PoliceReportDate { get; set; }

        // Fire Station Report
        public bool HasFireStationReport { get; set; }
        public string? FireStationName { get; set; }

        // Weather Report
        public bool HasWeatherReport { get; set; }
        public WeatherCondition? WeatherCondition { get; set; }
        public Probability? WeatherReportProbability { get; set; }
    }
}
