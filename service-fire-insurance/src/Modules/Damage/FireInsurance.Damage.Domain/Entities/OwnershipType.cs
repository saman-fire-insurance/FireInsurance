using FireInsurance.Damage.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Damage.Domain.Entities
{
    public class OwnershipType : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public bool IsActive { get; set; }

    }
}
