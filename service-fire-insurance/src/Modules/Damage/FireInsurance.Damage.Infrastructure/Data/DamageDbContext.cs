using FireInsurance.Damage.Domain.Entities;
using FireInsurance.Damage.Application.Data;
using Microsoft.EntityFrameworkCore;
using Common.Data;

namespace FireInsurance.Damage.Infrastructure.Data
{
    public sealed class DamageDbContext(DbContextOptions<DamageDbContext> options) : BaseDbContext<DamageDbContext>(options), IDamageDbContext
    {
        public const string DB_SCHEMA = "damage";

        public DbSet<DamageClaim> DamageClaims => Set<DamageClaim>();
        public DbSet<IncidentType> IncidentTypes => Set<IncidentType>();
        public DbSet<InsurableObject> InsurableObjects => Set<InsurableObject>();
        public DbSet<DamagedObject> DamagedObjects => Set<DamagedObject>();
        public DbSet<ThirdPartyCoverage> ThirdPartyCoverages => Set<ThirdPartyCoverage>();
        public DbSet<OwnershipType> OwnershipTypes => Set<OwnershipType>();
        public DbSet<Province> Provinces => Set<Province>();
        public DbSet<City> Cities => Set<City>();
        public DbSet<Incident> Incidents => Set<Incident>();
        public DbSet<StakeHolder> StakeHolders => Set<StakeHolder>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema(DB_SCHEMA);
            base.OnModelCreating(modelBuilder);
        }
    }
}
