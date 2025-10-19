using FireInsurance.Damage.Domain.Common;

namespace FireInsurance.Damage.Domain.Entities
{
    public class StakeHolder : BaseEntity
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string AccountNumber { get; set; } = string.Empty;
        public string Iban { get; set; } = string.Empty;
        public bool IsOwner { get; set; } = true;
    }
}
