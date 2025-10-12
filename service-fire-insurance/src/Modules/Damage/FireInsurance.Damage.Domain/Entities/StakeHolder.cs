using FireInsurance.Damage.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Damage.Domain.Entities
{
    public class StakeHolder : BaseEntity
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string AccountNumber { get; set; } = string.Empty;
        public string Iban { get; set; } = string.Empty;
        public bool IsOwner { get; set; } = true;
    }
}
