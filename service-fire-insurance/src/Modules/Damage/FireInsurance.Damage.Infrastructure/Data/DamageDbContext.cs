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
        public DbSet<ThirdPartyCoverage> ThirdPartyCoverages => Set<ThirdPartyCoverage>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema(DB_SCHEMA);
            base.OnModelCreating(modelBuilder);
        }
    }
}
