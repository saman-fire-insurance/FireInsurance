using FireInsurance.Users.Domain.Common;

namespace FireInsurance.Users.Domain.Events.UserEvents
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

    public class UserLoggedInDomainEvent(string userId, DateTime loginTime) : IDomainEvent
    {
        public Guid Id { get; } = Guid.NewGuid();
        public DateTime OccurredAt { get; } = DateTime.UtcNow;
        public string UserId { get; } = userId;
        public DateTime LoginTime { get; } = loginTime;
    }

    public class UserDeletedDomainEvent(string userId, DateTime deletedAt) : IDomainEvent
    {
        public Guid Id { get; } = Guid.NewGuid();
        public DateTime OccurredAt { get; } = DateTime.UtcNow;
        public string UserId { get; } = userId;
        public DateTime DeletedAt { get; } = deletedAt;
    }

}
