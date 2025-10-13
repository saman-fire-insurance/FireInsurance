using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Damage.Domain.Enums
{
    public enum DamageClaimStatus
    {
        InsurerInfo,
        IncidentInfo,
        DamagedObjectsInfo,
        StakeHolderInfo,
        Pending,
        Accepted,
        Rejected
    }
}
