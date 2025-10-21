using FireInsurance.Damage.Domain.Common;
using Mapster;

namespace FireInsurance.Damage.Domain.Entities
{

    [AdaptTo("[name]Dto"), AdaptTo("[name]SummaryDto"), GenerateMapper]
    public sealed class Province : BaseEntity
    {
        public static readonly Province None = new();

        // Used by EF Core
        private Province() : base()
        {
        }

        public string Name { get; private set; } = string.Empty;

        private readonly List<City> _cities = [];
        public IReadOnlyCollection<City> Cities => _cities.AsReadOnly();
    }
}
