using FireInsurance.Users.Domain.Common;

namespace FireInsurance.Users.Domain.Events.UserEvents
{
    public sealed record UserProfileUpdatedDomainEvent(
        string UserId,
        string? OldFirstName,
        string? OldLastName,
        string NewFirstName,
        string NewLastName) : IDomainEvent
    {
        public Guid Id { get; } = Guid.NewGuid();
        public DateTime OccurredAt { get; } = DateTime.UtcNow;
    }
}
