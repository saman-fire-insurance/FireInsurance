using Common.Data;
using FireInsurance.Damage.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FireInsurance.Damage.Application.Data
{
    public interface IDamageDbContext : IBaseDbContext
    {
        DbSet<DamageClaim> DamageClaims { get; }
        DbSet<IncidentType> IncidentTypes { get; }
        DbSet<ThirdPartyCoverage> ThirdPartyCoverages { get; }
    }
}
