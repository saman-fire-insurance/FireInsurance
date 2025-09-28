using FireInsurance.Insurance.Domain.Common;
using FireInsurance.Insurance.Domain.Common.Enums;

namespace FireInsurance.Insurance.Domain.Events.UserEvents
{
    public class InquiryResultAppliedDomainEvent(string userId, string firstName, string lastName, string fatherName, string? nationalID, Gender gender) : IDomainEvent
    {
        public Guid Id { get; } = Guid.NewGuid();
        public DateTime OccurredAt { get; } = DateTime.UtcNow;
        public string UserId { get; } = userId;
        public string FirstName { get; } = firstName;
        public string LastName { get; } = lastName;
        public string FatherName { get; } = fatherName;
        public string? NationalID { get; } = nationalID;
        public Gender Gender { get; } = gender;
    }
}
