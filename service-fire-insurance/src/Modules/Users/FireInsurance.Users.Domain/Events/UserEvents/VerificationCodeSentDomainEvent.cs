using FireInsurance.Users.Domain.Common;
using FireInsurance.Users.Domain.Entities;

namespace FireInsurance.Users.Domain.Events.UserEvents
{
    public class VerificationCodeSentDomainEvent(string userId, string phoneNumber, DateTime sentAt) : IDomainEvent
    {
        public Guid Id { get; } = Guid.NewGuid();
        public DateTime OccurredAt { get; } = DateTime.UtcNow;
        public string UserId { get; } = userId;
        public string PhoneNumber { get; } = phoneNumber;
        public DateTime SentAt { get; } = sentAt;
    }
}
