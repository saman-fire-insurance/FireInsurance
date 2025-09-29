using MediatR;

namespace FireInsurance.Insurance.Domain.Common
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
