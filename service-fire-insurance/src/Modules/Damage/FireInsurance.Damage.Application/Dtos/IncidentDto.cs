using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Damage.Application.Dtos
{
    public class IncidentDto : BaseDto
    {
        public DateTime OccuranceDate { get; set; }
        public string Location { get; set; } = string.Empty;
        public Guid IncidentTypeId { get; set; }
        public IncidentTypeDto? IncidentType { get; set; }
        public required string IncidentCause { get; set; }
        public string RestraintDescription { get; set; } = string.Empty;
    }
}
