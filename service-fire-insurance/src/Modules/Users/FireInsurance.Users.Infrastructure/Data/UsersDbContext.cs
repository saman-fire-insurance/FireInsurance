using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Reflection;
using FireInsurance.Users.Domain.Entities;

namespace FireInsurance.Users.Infrastructure.Data
{

    public class UsersDbContext(DbContextOptions<UsersDbContext> options) : IdentityDbContext<User>(options)
    {
        public const string DB_SCHEMA = "users";

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.HasDefaultSchema(DB_SCHEMA);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }

}
