using FireInsurance.Damage.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FireInsurance.Damage.Infrastructure.Data
{
    public class DamageDbContext : DbContext
    {

        public const string DB_SCHEMA = "damage";

        public DbSet<DamageClaim> PetTypes => Set<DamageClaim>();
    }
}
