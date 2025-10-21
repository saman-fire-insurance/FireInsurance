using Ardalis.Result;
using FireInsurance.Damage.Domain.Common;
using Mapster;

namespace FireInsurance.Damage.Domain.Entities
{
    [AdaptTo("[name]Dto"), GenerateMapper]
    public class ThirdPartyCoverage : BaseEntity
    {
        public required string CompanyName { get; set; }
        public required string PolicyNumber { get; set; }
        public List<ThirdPartyCoveredObject> ThirdPartyCoveredObjects { get; set; } = [];

        public static Result<ThirdPartyCoverage> Create(string companyName, string policyNumber, List<InsurableObject> insurableObjects)
        {
            var createdCoverage = new ThirdPartyCoverage
            {
                CompanyName = companyName,
                PolicyNumber = policyNumber,
                ThirdPartyCoveredObjects = [ .. insurableObjects.Select(io => new ThirdPartyCoveredObject { InsurableObject = io }) ],
            };

            return Result.Success(createdCoverage);
        }
    }
}
