using MediatR;

namespace FireInsurance.Users.Domain.Common
{
    /// <summary>
    /// Base interface for domain events
    /// </summary>
    public interface IDomainEvent : INotification
    {
        Guid Id { get; }
        DateTime OccurredAt { get; }
    }
}
