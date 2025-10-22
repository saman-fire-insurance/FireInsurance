using Ardalis.Result;
using FireInsurance.Damage.Domain.Common;
using Mapster;

namespace FireInsurance.Damage.Domain.Entities
{
    [AdaptTo("[name]Dto"), GenerateMapper]
    public class StakeHolder : BaseEntity
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string? AccountNumber { get; set; } = string.Empty;
        public string? Iban { get; set; } = string.Empty;
        public bool IsOwner { get; set; } = false;

        public static Result<StakeHolder> Create(
            string firstName,
            string lastName,
            string phoneNumber,
            string? accountNumber = null,
            string? iban = null,
            bool isOwner = false)
        {
            // Validate required fields
            if (string.IsNullOrWhiteSpace(firstName))
            {
                return Result.Error("First name is required.");
            }

            if (string.IsNullOrWhiteSpace(lastName))
            {
                return Result.Error("Last name is required.");
            }

            if (string.IsNullOrWhiteSpace(phoneNumber))
            {
                return Result.Error("Phone number is required.");
            }

            var stakeHolder = new StakeHolder
            {
                FirstName = firstName,
                LastName = lastName,
                PhoneNumber = phoneNumber,
                AccountNumber = accountNumber,
                Iban = iban,
                IsOwner = isOwner
            };

            return Result.Success(stakeHolder);
        }
    }
}
