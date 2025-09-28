using FireInsurance.Insurance.Domain.Common;

namespace FireInsurance.Insurance.Domain.Events.UserEvents
{
    public class SendVerificationCodeDomainEvent(string userId, string phoneNumber) : IDomainEvent
    {
        public Guid Id { get; } = Guid.NewGuid();
        public DateTime OccurredAt { get; } = DateTime.UtcNow;
        public string UserId { get; } = userId;
        public string PhoneNumber { get; } = phoneNumber;
    }
}
