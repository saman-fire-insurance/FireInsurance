using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FireInsurance.Damage.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DamagedObjects : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_third_party_coverages_insurable_object_insurable_object_id",
                schema: "damage",
                table: "third_party_coverages");

            migrationBuilder.DropPrimaryKey(
                name: "pk_insurable_object",
                schema: "damage",
                table: "insurable_object");

            migrationBuilder.RenameTable(
                name: "insurable_object",
                schema: "damage",
                newName: "insurable_objects",
                newSchema: "damage");

            migrationBuilder.AddPrimaryKey(
                name: "pk_insurable_objects",
                schema: "damage",
                table: "insurable_objects",
                column: "id");

            migrationBuilder.CreateTable(
                name: "damaged_objects",
                schema: "damage",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    damage_claim_id = table.Column<Guid>(type: "uuid", nullable: false),
                    insurable_object_id = table.Column<Guid>(type: "uuid", nullable: false),
                    coverage_id = table.Column<Guid>(type: "uuid", nullable: false),
                    description = table.Column<string>(type: "character varying(1000)", nullable: true),
                    estimated_loss = table.Column<decimal>(type: "numeric", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_damaged_objects", x => x.id);
                    table.ForeignKey(
                        name: "fk_damaged_objects_damage_claims_damage_claim_id",
                        column: x => x.damage_claim_id,
                        principalSchema: "damage",
                        principalTable: "damage_claims",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_damaged_objects_insurable_objects_insurable_object_id",
                        column: x => x.insurable_object_id,
                        principalSchema: "damage",
                        principalTable: "insurable_objects",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_damaged_objects_damage_claim_id",
                schema: "damage",
                table: "damaged_objects",
                column: "damage_claim_id");

            migrationBuilder.CreateIndex(
                name: "ix_damaged_objects_insurable_object_id",
                schema: "damage",
                table: "damaged_objects",
                column: "insurable_object_id");

            migrationBuilder.AddForeignKey(
                name: "fk_third_party_coverages_insurable_objects_insurable_object_id",
                schema: "damage",
                table: "third_party_coverages",
                column: "insurable_object_id",
                principalSchema: "damage",
                principalTable: "insurable_objects",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_third_party_coverages_insurable_objects_insurable_object_id",
                schema: "damage",
                table: "third_party_coverages");

            migrationBuilder.DropTable(
                name: "damaged_objects",
                schema: "damage");

            migrationBuilder.DropPrimaryKey(
                name: "pk_insurable_objects",
                schema: "damage",
                table: "insurable_objects");

            migrationBuilder.RenameTable(
                name: "insurable_objects",
                schema: "damage",
                newName: "insurable_object",
                newSchema: "damage");

            migrationBuilder.AddPrimaryKey(
                name: "pk_insurable_object",
                schema: "damage",
                table: "insurable_object",
                column: "id");

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
    }
}
