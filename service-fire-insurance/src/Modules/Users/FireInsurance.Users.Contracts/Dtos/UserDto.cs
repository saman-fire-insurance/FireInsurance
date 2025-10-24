using FireInsurance.Users.Contracts.Enums;

namespace FireInsurance.Users.Contracts.Dtos
{
    public class UserDto
    {
        public string? FirstName { get; init; }
        public string? LastName { get; init; }
        public string? FullName { get; init; }
        public string? FatherName { get; init; }
        public string? NationalID { get; init; }
        public string? PhoneNumber { get; init; }
        public DateOnly? DateOfBirth { get; init; }
        public Gender? Gender { get; init; }
        public DateTime? CodeSentAt { get; init; }
        public DateTime? CreatedAt { get; init; }
        public DateTime? LoggedInAt { get; init; }
        public DateTime? DeletedAt { get; init; }
        public bool IdentityConfirmed { get; init; }
        public bool Admin { get; init; }
        public bool SuperAdmin { get; init; }
    }
}
