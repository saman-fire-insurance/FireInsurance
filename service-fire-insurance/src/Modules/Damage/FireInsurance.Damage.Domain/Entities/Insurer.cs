using Microsoft.EntityFrameworkCore;

namespace FireInsurance.Damage.Domain.Entities
{
    [Owned]
    public class Insurer
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
    }
}
