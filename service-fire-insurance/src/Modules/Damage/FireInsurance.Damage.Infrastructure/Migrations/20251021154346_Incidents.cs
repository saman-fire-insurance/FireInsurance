using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FireInsurance.Damage.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Incidents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "file_ids",
                schema: "damage",
                table: "damage_claims",
                newName: "insurance_file_ids");

            migrationBuilder.CreateTable(
                name: "incidents",
                schema: "damage",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    incident_type_id = table.Column<Guid>(type: "uuid", nullable: false),
                    occurance_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    province_id = table.Column<Guid>(type: "uuid", nullable: false),
                    city_id = table.Column<Guid>(type: "uuid", nullable: false),
                    address = table.Column<string>(type: "character varying(1000)", nullable: false),
                    postal_code = table.Column<string>(type: "character varying(1000)", nullable: false),
                    ownership_type_id = table.Column<Guid>(type: "uuid", nullable: false),
                    incident_cause = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    restraint_description = table.Column<string>(type: "character varying(1000)", nullable: false),
                    incident_image_file_ids = table.Column<List<Guid>>(type: "uuid[]", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_incidents", x => x.id);
                    table.ForeignKey(
                        name: "fk_incidents_cities_city_id",
                        column: x => x.city_id,
                        principalSchema: "damage",
                        principalTable: "cities",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_incidents_incident_types_incident_type_id",
                        column: x => x.incident_type_id,
                        principalSchema: "damage",
                        principalTable: "incident_types",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_incidents_ownership_types_ownership_type_id",
                        column: x => x.ownership_type_id,
                        principalSchema: "damage",
                        principalTable: "ownership_types",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_incidents_provinces_province_id",
                        column: x => x.province_id,
                        principalSchema: "damage",
                        principalTable: "provinces",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "stored_file",
                schema: "damage",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(1000)", nullable: false),
                    key = table.Column<string>(type: "character varying(1000)", nullable: false),
                    content_type = table.Column<string>(type: "character varying(1000)", nullable: false),
                    bucket_name = table.Column<string>(type: "character varying(1000)", nullable: false),
                    size_in_bytes = table.Column<long>(type: "bigint", nullable: false),
                    uploaded_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    file_category = table.Column<int>(type: "integer", nullable: false),
                    incident_id = table.Column<Guid>(type: "uuid", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_stored_file", x => x.id);
                    table.ForeignKey(
                        name: "fk_stored_file_incidents_incident_id",
                        column: x => x.incident_id,
                        principalSchema: "damage",
                        principalTable: "incidents",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "ix_damage_claims_incident_id",
                schema: "damage",
                table: "damage_claims",
                column: "incident_id");

            migrationBuilder.CreateIndex(
                name: "ix_incidents_city_id",
                schema: "damage",
                table: "incidents",
                column: "city_id");

            migrationBuilder.CreateIndex(
                name: "ix_incidents_incident_type_id",
                schema: "damage",
                table: "incidents",
                column: "incident_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_incidents_ownership_type_id",
                schema: "damage",
                table: "incidents",
                column: "ownership_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_incidents_province_id",
                schema: "damage",
                table: "incidents",
                column: "province_id");

            migrationBuilder.CreateIndex(
                name: "ix_stored_file_incident_id",
                schema: "damage",
                table: "stored_file",
                column: "incident_id");

            migrationBuilder.AddForeignKey(
                name: "fk_damage_claims_incidents_incident_id",
                schema: "damage",
                table: "damage_claims",
                column: "incident_id",
                principalSchema: "damage",
                principalTable: "incidents",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_damage_claims_incidents_incident_id",
                schema: "damage",
                table: "damage_claims");

            migrationBuilder.DropTable(
                name: "stored_file",
                schema: "damage");

            migrationBuilder.DropTable(
                name: "incidents",
                schema: "damage");

            migrationBuilder.DropIndex(
                name: "ix_damage_claims_incident_id",
                schema: "damage",
                table: "damage_claims");

            migrationBuilder.RenameColumn(
                name: "insurance_file_ids",
                schema: "damage",
                table: "damage_claims",
                newName: "file_ids");
        }
    }
}
