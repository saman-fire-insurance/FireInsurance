using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Damage.Application.Dtos
{
    public sealed record CityDto(Guid Id, string Name, ProvinceSummaryDto Province);

    public sealed record CitySummaryDto(Guid Id, string Name);
}
