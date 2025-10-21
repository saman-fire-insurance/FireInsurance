using FireInsurance.Damage.Domain.Common;
using Mapster;

namespace FireInsurance.Damage.Domain.Entities
{
    [AdaptTo("[name]Dto"), AdaptTo("[name]SummaryDto"), GenerateMapper]
    public class City : BaseEntity
    {
        // Used by EF Core
        private City() : base()
        {
        }

        public string Name { get; private set; } = string.Empty;

        public Guid ProvinceId { get; private set; }
        public Province Province { get; private set; } = Province.None;
    }
}
