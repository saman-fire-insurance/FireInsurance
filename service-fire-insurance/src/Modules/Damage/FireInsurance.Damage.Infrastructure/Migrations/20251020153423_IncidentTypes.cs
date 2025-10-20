using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FireInsurance.Damage.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class IncidentTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_damage_claims_third_party_coverage_third_party_coverage_id",
                schema: "damage",
                table: "damage_claims");

            migrationBuilder.DropForeignKey(
                name: "fk_third_party_coverage_insurable_object_insurable_object_id",
                schema: "damage",
                table: "third_party_coverage");

            migrationBuilder.DropPrimaryKey(
                name: "pk_third_party_coverage",
                schema: "damage",
                table: "third_party_coverage");

            migrationBuilder.RenameTable(
                name: "third_party_coverage",
                schema: "damage",
                newName: "third_party_coverages",
                newSchema: "damage");

            migrationBuilder.RenameIndex(
                name: "ix_third_party_coverage_insurable_object_id",
                schema: "damage",
                table: "third_party_coverages",
                newName: "ix_third_party_coverages_insurable_object_id");

            migrationBuilder.AddColumn<bool>(
                name: "is_deleted",
                schema: "damage",
                table: "insurable_object",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "is_deleted",
                schema: "damage",
                table: "damage_claims",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "is_deleted",
                schema: "damage",
                table: "third_party_coverages",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "pk_third_party_coverages",
                schema: "damage",
                table: "third_party_coverages",
                column: "id");

            migrationBuilder.CreateTable(
                name: "incident_types",
                schema: "damage",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    title = table.Column<string>(type: "character varying(1000)", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_incident_types", x => x.id);
                });

            migrationBuilder.AddForeignKey(
                name: "fk_damage_claims_third_party_coverages_third_party_coverage_id",
                schema: "damage",
                table: "damage_claims",
                column: "third_party_coverage_id",
                principalSchema: "damage",
                principalTable: "third_party_coverages",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_third_party_coverages_insurable_object_insurable_object_id",
                schema: "damage",
                table: "third_party_coverages",
                column: "insurable_object_id",
                principalSchema: "damage",
                principalTable: "insurable_object",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_damage_claims_third_party_coverages_third_party_coverage_id",
                schema: "damage",
                table: "damage_claims");

            migrationBuilder.DropForeignKey(
                name: "fk_third_party_coverages_insurable_object_insurable_object_id",
                schema: "damage",
                table: "third_party_coverages");

            migrationBuilder.DropTable(
                name: "incident_types",
                schema: "damage");

            migrationBuilder.DropPrimaryKey(
                name: "pk_third_party_coverages",
                schema: "damage",
                table: "third_party_coverages");

            migrationBuilder.DropColumn(
                name: "is_deleted",
                schema: "damage",
                table: "insurable_object");

            migrationBuilder.DropColumn(
                name: "is_deleted",
                schema: "damage",
                table: "damage_claims");

            migrationBuilder.DropColumn(
                name: "is_deleted",
                schema: "damage",
                table: "third_party_coverages");

            migrationBuilder.RenameTable(
                name: "third_party_coverages",
                schema: "damage",
                newName: "third_party_coverage",
                newSchema: "damage");

            migrationBuilder.RenameIndex(
                name: "ix_third_party_coverages_insurable_object_id",
                schema: "damage",
                table: "third_party_coverage",
                newName: "ix_third_party_coverage_insurable_object_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_third_party_coverage",
                schema: "damage",
                table: "third_party_coverage",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_damage_claims_third_party_coverage_third_party_coverage_id",
                schema: "damage",
                table: "damage_claims",
                column: "third_party_coverage_id",
                principalSchema: "damage",
                principalTable: "third_party_coverage",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_third_party_coverage_insurable_object_insurable_object_id",
                schema: "damage",
                table: "third_party_coverage",
                column: "insurable_object_id",
                principalSchema: "damage",
                principalTable: "insurable_object",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
