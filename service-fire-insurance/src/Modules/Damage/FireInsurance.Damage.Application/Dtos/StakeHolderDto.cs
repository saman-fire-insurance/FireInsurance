namespace FireInsurance.Damage.Application.Dtos
{
    public class StakeHolderDto : BaseDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string AccountNumber { get; set; } = string.Empty;
        public string Iban { get; set; } = string.Empty;
        public bool IsOwner { get; set; }
    }
}
