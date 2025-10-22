using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FireInsurance.Damage.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class StakeHolders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_stake_holder_damage_claims_damage_claim_id",
                schema: "damage",
                table: "stake_holder");

            migrationBuilder.DropPrimaryKey(
                name: "pk_stake_holder",
                schema: "damage",
                table: "stake_holder");

            migrationBuilder.RenameTable(
                name: "stake_holder",
                schema: "damage",
                newName: "stake_holders",
                newSchema: "damage");

            migrationBuilder.RenameIndex(
                name: "ix_stake_holder_damage_claim_id",
                schema: "damage",
                table: "stake_holders",
                newName: "ix_stake_holders_damage_claim_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_stake_holders",
                schema: "damage",
                table: "stake_holders",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_stake_holders_damage_claims_damage_claim_id",
                schema: "damage",
                table: "stake_holders",
                column: "damage_claim_id",
                principalSchema: "damage",
                principalTable: "damage_claims",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_stake_holders_damage_claims_damage_claim_id",
                schema: "damage",
                table: "stake_holders");

            migrationBuilder.DropPrimaryKey(
                name: "pk_stake_holders",
                schema: "damage",
                table: "stake_holders");

            migrationBuilder.RenameTable(
                name: "stake_holders",
                schema: "damage",
                newName: "stake_holder",
                newSchema: "damage");

            migrationBuilder.RenameIndex(
                name: "ix_stake_holders_damage_claim_id",
                schema: "damage",
                table: "stake_holder",
                newName: "ix_stake_holder_damage_claim_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_stake_holder",
                schema: "damage",
                table: "stake_holder",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_stake_holder_damage_claims_damage_claim_id",
                schema: "damage",
                table: "stake_holder",
                column: "damage_claim_id",
                principalSchema: "damage",
                principalTable: "damage_claims",
                principalColumn: "id");
        }
    }
}
