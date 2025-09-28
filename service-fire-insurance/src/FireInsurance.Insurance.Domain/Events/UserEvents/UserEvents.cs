using FireInsurance.Insurance.Domain.Common.Enums;
using FireInsurance.Insurance.Domain.Common;

namespace FireInsurance.Insurance.Domain.Events.UserEvents
{
    public class UserRegisteredDomainEvent(string userId, string phoneNumber) : IDomainEvent
    {
        public Guid Id { get; } = Guid.NewGuid();
        public DateTime OccurredAt { get; } = DateTime.UtcNow;
        public string UserId { get; } = userId;
        public string PhoneNumber { get; } = phoneNumber;
    }

    public class AdminUserRegisteredDomainEvent(string userId, string phoneNumber, string firstName, string lastName) : IDomainEvent
    {
        public Guid Id { get; } = Guid.NewGuid();
        public DateTime OccurredAt { get; } = DateTime.UtcNow;
        public string UserId { get; } = userId;
        public string PhoneNumber { get; } = phoneNumber;
        public string FirstName { get; } = firstName;
        public string LastName { get; } = lastName;
    }

    public class UserProfileUpdatedDomainEvent(string userId, string? oldFirstName, string? oldLastName, string newFirstName, string newLastName) : IDomainEvent
    {
        public Guid Id { get; } = Guid.NewGuid();
        public DateTime OccurredAt { get; } = DateTime.UtcNow;
        public string UserId { get; } = userId;
        public string? OldFirstName { get; } = oldFirstName;
        public string? OldLastName { get; } = oldLastName;
        public string NewFirstName { get; } = newFirstName;
        public string NewLastName { get; } = newLastName;
    }

    public class UserLoggedInDomainEvent(string userId, DateTime loginTime) : IDomainEvent
    {
        public Guid Id { get; } = Guid.NewGuid();
        public DateTime OccurredAt { get; } = DateTime.UtcNow;
        public string UserId { get; } = userId;
        public DateTime LoginTime { get; } = loginTime;
    }

    public class VerificationCodeSentDomainEvent(string userId, string phoneNumber, DateTime sentAt) : IDomainEvent
    {
        public Guid Id { get; } = Guid.NewGuid();
        public DateTime OccurredAt { get; } = DateTime.UtcNow;
        public string UserId { get; } = userId;
        public string PhoneNumber { get; } = phoneNumber;
        public DateTime SentAt { get; } = sentAt;
    }

    public class UserDeletedDomainEvent(string userId, DateTime deletedAt) : IDomainEvent
    {
        public Guid Id { get; } = Guid.NewGuid();
        public DateTime OccurredAt { get; } = DateTime.UtcNow;
        public string UserId { get; } = userId;
        public DateTime DeletedAt { get; } = deletedAt;
    }

}
