using FireInsurance.Damage.Domain.Common;
using FireInsurance.Damage.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Damage.Domain.Entities
{
    public class DamageClaim : BaseEntity
    {
        public Guid Guid { get; set; }
        public string SerialNumber { get; set; }
        public string Code { get; set; }
        public Guid UserId { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public List<Guid> FileIds { get; set; }
        //public List<FileEntity> Files { get; set; }
        public Guid IncidentId { get; set; }
        public Incident Incident { get; set; }
        public List<DamagedObject> DamagedObjects { get; set; }
        public IncidentType IncidentType { get; set; }
        public string IncidentCause { get; set; } = string.Empty;
        public string SuppressionAction { get; set; } = string.Empty;
        public Guid OwnershipTypeId { get; set; }
        public OwnershipType OwnershipType { get; set; }
        public Guid? StakeHolderId { get; set; }
        public StakeHolder? StakeHolder { get; set; }
        //public ThirdPartyInsuranceItem ThirdPartyInsuranceItem { get; set; }
    }
}
