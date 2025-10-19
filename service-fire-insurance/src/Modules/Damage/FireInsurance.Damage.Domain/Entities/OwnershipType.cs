using FireInsurance.Damage.Domain.Common;

namespace FireInsurance.Damage.Domain.Entities
{
    public class OwnershipType : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }
}
