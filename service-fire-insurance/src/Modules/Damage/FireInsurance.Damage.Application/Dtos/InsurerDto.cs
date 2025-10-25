namespace FireInsurance.Damage.Application.Dtos
{
    public class InsurerDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string AccountNumber { get; set; } = string.Empty;
        public string Iban { get; set; } = string.Empty;
        public string NationalID { get; set; } = string.Empty;
        public DateOnly? DateOfBirth { get; set; }
    }
}