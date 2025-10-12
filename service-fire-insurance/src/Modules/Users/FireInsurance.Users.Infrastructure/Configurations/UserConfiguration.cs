using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore;
using FireInsurance.Users.Domain.Entities;

namespace FireInsurance.Users.Infrastructure.Configurations
{
    internal sealed class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
                .HasQueryFilter(user => !user.DeletedAt.HasValue);

            builder
                .Property(o => o.FullName)
                .HasComputedColumnSql("translate(\"first_name\" || ' ' || \"last_name\",  'يىكۀؤ', 'یکههو')", stored: true)
                .ValueGeneratedOnAddOrUpdate()
                .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
        }
    }
}
