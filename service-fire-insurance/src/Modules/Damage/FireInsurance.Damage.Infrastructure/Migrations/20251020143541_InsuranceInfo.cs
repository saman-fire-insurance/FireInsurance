using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FireInsurance.Damage.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InsuranceInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "third_party_coverage_id",
                schema: "damage",
                table: "damage_claims",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "insurable_object",
                schema: "damage",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    saman_id = table.Column<int>(type: "integer", nullable: false),
                    title = table.Column<string>(type: "character varying(1000)", nullable: false),
                    is_active = table.Column<bool>(type: "boolean", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_insurable_object", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "third_party_coverage",
                schema: "damage",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    company_name = table.Column<string>(type: "character varying(1000)", nullable: false),
                    policy_number = table.Column<string>(type: "character varying(1000)", nullable: false),
                    insurable_object_id = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_third_party_coverage", x => x.id);
                    table.ForeignKey(
                        name: "fk_third_party_coverage_insurable_object_insurable_object_id",
                        column: x => x.insurable_object_id,
                        principalSchema: "damage",
                        principalTable: "insurable_object",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_damage_claims_third_party_coverage_id",
                schema: "damage",
                table: "damage_claims",
                column: "third_party_coverage_id");

            migrationBuilder.CreateIndex(
                name: "ix_third_party_coverage_insurable_object_id",
                schema: "damage",
                table: "third_party_coverage",
                column: "insurable_object_id");

            migrationBuilder.AddForeignKey(
                name: "fk_damage_claims_third_party_coverage_third_party_coverage_id",
                schema: "damage",
                table: "damage_claims",
                column: "third_party_coverage_id",
                principalSchema: "damage",
                principalTable: "third_party_coverage",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_damage_claims_third_party_coverage_third_party_coverage_id",
                schema: "damage",
                table: "damage_claims");

            migrationBuilder.DropTable(
                name: "third_party_coverage",
                schema: "damage");

            migrationBuilder.DropTable(
                name: "insurable_object",
                schema: "damage");

            migrationBuilder.DropIndex(
                name: "ix_damage_claims_third_party_coverage_id",
                schema: "damage",
                table: "damage_claims");

            migrationBuilder.DropColumn(
                name: "third_party_coverage_id",
                schema: "damage",
                table: "damage_claims");
        }
    }
}
