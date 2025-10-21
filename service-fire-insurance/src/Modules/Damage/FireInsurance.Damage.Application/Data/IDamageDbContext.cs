using Common.Data;
using FireInsurance.Damage.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FireInsurance.Damage.Application.Data
{
    public interface IDamageDbContext : IBaseDbContext
    {
        DbSet<DamageClaim> DamageClaims { get; }
        DbSet<IncidentType> IncidentTypes { get; }
        DbSet<InsurableObject> InsurableObjects { get; }
        DbSet<DamagedObject> DamagedObjects { get; }
        DbSet<ThirdPartyCoverage> ThirdPartyCoverages { get; }
        DbSet<OwnershipType> OwnershipTypes { get; }
        DbSet<Province> Provinces { get; }
        DbSet<City> Cities { get; }
        DbSet<Incident> Incidents{ get; }

}
}
