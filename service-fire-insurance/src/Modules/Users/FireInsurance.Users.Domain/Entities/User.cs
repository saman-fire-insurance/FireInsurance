using Ardalis.Result;
using FireInsurance.Users.Contracts.Enums;
using FireInsurance.Users.Domain.Common;
using FireInsurance.Users.Domain.Errors;
using FireInsurance.Users.Domain.Events.UserEvents;
using Microsoft.AspNetCore.Identity;

namespace FireInsurance.Users.Domain.Entities
{
    public class User : IdentityUser
    {
        private readonly List<IDomainEvent> _domainEvents = [];

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

        public static Result<User> SignUp(string phoneNumber)
        {
            if (string.IsNullOrWhiteSpace(phoneNumber))
                return Result<User>.Invalid(new ValidationError("Phone number is required"));

            if (!IsValidPhoneNumber(phoneNumber))
                return Result<User>.Invalid(new ValidationError("Invalid phone number format"));

            var user = new User
            {
                UserName = phoneNumber,
                PhoneNumber = phoneNumber,
            };

            user._domainEvents.Add(new UserRegisteredDomainEvent(user.Id, phoneNumber));

            return Result<User>.Success(user);
        }

        public static Result<User> SignUpAdmin(string phoneNumber, string firstName, string lastName)
        {
            if (string.IsNullOrWhiteSpace(phoneNumber))
                return Result<User>.Invalid(new ValidationError("Phone number is required"));

            if (string.IsNullOrWhiteSpace(firstName))
                return Result<User>.Invalid(new ValidationError("First name is required"));

            if (string.IsNullOrWhiteSpace(lastName))
                return Result<User>.Invalid(new ValidationError("Last name is required"));

            if (!IsValidPhoneNumber(phoneNumber))
                return Result<User>.Invalid(new ValidationError("Invalid phone number format"));

            var user = new User
            {
                UserName = phoneNumber + "@admin",
                PhoneNumber = phoneNumber,
                FirstName = firstName,
                LastName = lastName,
                PhoneNumberConfirmed = true,
                Admin = true,
            };

            user._domainEvents.Add(new AdminUserRegisteredDomainEvent(user.Id, phoneNumber, firstName, lastName));

            return Result<User>.Success(user);
        }

        public void Update(string firstName, string lastName, string? nationalID = null, DateOnly? dateOfBirth = null)
        {
            var oldFirstName = FirstName;
            var oldLastName = LastName;

            FirstName = firstName;
            LastName = lastName;

            if (!string.IsNullOrWhiteSpace(nationalID))
            {
                NationalID = nationalID;
            }

            if (dateOfBirth.HasValue)
            {
                DateOfBirth = dateOfBirth;
            }

            _domainEvents.Add(new UserProfileUpdatedDomainEvent(Id, oldFirstName, oldLastName, firstName, lastName));
        }

        public void ApplyInquiryResult(string firstName, string lastName, string fatherName, string nationalID, string dateOfBirth, Gender gender)
        {
            if (string.IsNullOrWhiteSpace(firstName) ||
                string.IsNullOrWhiteSpace(lastName) ||
                string.IsNullOrWhiteSpace(fatherName) ||
                string.IsNullOrWhiteSpace(nationalID))
                //||
                //string.IsNullOrWhiteSpace(dateOfBirth))
            {
                throw new ArgumentException("Inquiry result fields cannot be null or empty");
            }

            FirstName = firstName;
            LastName = lastName;
            Gender = gender;
            FatherName = fatherName;
            IdentityConfirmed = true;
            NationalID = nationalID ?? NationalID;
            //DateOfBirth = dateOfBirth ?? DateOfBirth;

            _domainEvents.Add(new InquiryResultAppliedDomainEvent(Id, firstName, lastName, fatherName, nationalID, gender));
        }

        public void Login()
        {
            LoggedInAt = DateTime.UtcNow;

            _domainEvents.Add(new UserLoggedInDomainEvent(Id, LoggedInAt.Value));
        }

        public bool CanSendCode(long minutes)
        {
            return !CodeSentAt.HasValue || DateTime.Compare(CodeSentAt.Value.AddMinutes(minutes), DateTime.UtcNow) <= 0;
        }

        public Result SendCode()
        {
            if (string.IsNullOrEmpty(PhoneNumber))
            {
                return Result.Invalid(new ValidationError(UserErrors.PhoneNumber.Empty));
            }

            if (!CanSendCode(0))
            {
                return Result.Invalid(new ValidationError(UserErrors.CodeSentRecently(3)));
            }

            CodeSentAt = DateTime.UtcNow;

            _domainEvents.Add(new VerificationCodeSentDomainEvent(Id, PhoneNumber, DateTime.UtcNow));

            return Result.Success();
        }

        public void Delete()
        {
            UserName += "Deleted" + Guid.NewGuid().ToString("N");
            DeletedAt = DateTime.UtcNow;

            _domainEvents.Add(new UserDeletedDomainEvent(Id, DeletedAt.Value));
        }

        public IReadOnlyCollection<IDomainEvent> GetDomainEvents() => _domainEvents.AsReadOnly();
        public void ClearDomainEvents() => _domainEvents.Clear();

        private static bool IsValidPhoneNumber(string phoneNumber)
        {
            return !string.IsNullOrWhiteSpace(phoneNumber) &&
                   phoneNumber.Length >= 10 &&
                   phoneNumber.All(char.IsDigit);
        }
    }
}
