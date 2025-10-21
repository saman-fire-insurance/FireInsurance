using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FireInsurance.Damage.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ThirdPartyCoveredObjects : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_third_party_coverages_insurable_objects_insurable_object_id",
                schema: "damage",
                table: "third_party_coverages");

            migrationBuilder.DropIndex(
                name: "ix_third_party_coverages_insurable_object_id",
                schema: "damage",
                table: "third_party_coverages");

            migrationBuilder.DropColumn(
                name: "insurable_object_id",
                schema: "damage",
                table: "third_party_coverages");

            migrationBuilder.CreateTable(
                name: "third_party_covered_object",
                schema: "damage",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    third_party_coverage_id = table.Column<Guid>(type: "uuid", nullable: false),
                    insurable_object_id = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_third_party_covered_object", x => x.id);
                    table.ForeignKey(
                        name: "fk_third_party_covered_object_insurable_objects_insurable_obje",
                        column: x => x.insurable_object_id,
                        principalSchema: "damage",
                        principalTable: "insurable_objects",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_third_party_covered_object_third_party_coverages_third_part",
                        column: x => x.third_party_coverage_id,
                        principalSchema: "damage",
                        principalTable: "third_party_coverages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_third_party_covered_object_insurable_object_id",
                schema: "damage",
                table: "third_party_covered_object",
                column: "insurable_object_id");

            migrationBuilder.CreateIndex(
                name: "ix_third_party_covered_object_third_party_coverage_id",
                schema: "damage",
                table: "third_party_covered_object",
                column: "third_party_coverage_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "third_party_covered_object",
                schema: "damage");

            migrationBuilder.AddColumn<Guid>(
                name: "insurable_object_id",
                schema: "damage",
                table: "third_party_coverages",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "ix_third_party_coverages_insurable_object_id",
                schema: "damage",
                table: "third_party_coverages",
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
    }
}
