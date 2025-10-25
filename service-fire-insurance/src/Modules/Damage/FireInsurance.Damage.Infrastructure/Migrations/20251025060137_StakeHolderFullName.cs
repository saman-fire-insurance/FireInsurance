using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FireInsurance.Damage.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class StakeHolderFullName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "first_name",
                schema: "damage",
                table: "stake_holders");

            migrationBuilder.RenameColumn(
                name: "last_name",
                schema: "damage",
                table: "stake_holders",
                newName: "full_name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "full_name",
                schema: "damage",
                table: "stake_holders",
                newName: "last_name");

            migrationBuilder.AddColumn<string>(
                name: "first_name",
                schema: "damage",
                table: "stake_holders",
                type: "character varying(1000)",
                nullable: false,
                defaultValue: "");
        }
    }
}
