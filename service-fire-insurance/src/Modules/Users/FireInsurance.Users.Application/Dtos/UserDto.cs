using FireInsurance.Users.Domain.Common.Enums;

namespace FireInsurance.Users.Application.Dtos
{
    public class UserDto
    {
        public string? FirstName { get; private set; }
        public string? LastName { get; private set; }
        public string? FullName { get; set; } = null;
        public string? FatherName { get; private set; }
        public string? NationalID { get; private set; }
        public DateOnly? DateOfBirth { get; private set; }
        public Gender? Gender { get; private set; }
        public DateTime? CodeSentAt { get; private set; }
        public DateTime? CreatedAt { get; private set; }
        public DateTime? LoggedInAt { get; private set; }
        public DateTime? DeletedAt { get; private set; }
        public bool IdentityConfirmed { get; private set; }
        public bool Admin { get; private set; }
        public bool SuperAdmin { get; private set; }
    }
}
