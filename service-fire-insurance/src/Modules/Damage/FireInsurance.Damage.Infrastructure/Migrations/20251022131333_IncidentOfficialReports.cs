using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FireInsurance.Damage.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class IncidentOfficialReports : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "stake_holder_id",
                schema: "damage",
                table: "damage_claims");

            migrationBuilder.AddColumn<Guid>(
                name: "damage_claim_id",
                schema: "damage",
                table: "stored_file",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "incident_id1",
                schema: "damage",
                table: "stored_file",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "incident_id2",
                schema: "damage",
                table: "stored_file",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "other",
                schema: "damage",
                table: "insurable_objects",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "fire_station_name",
                schema: "damage",
                table: "incidents",
                type: "character varying(1000)",
                nullable: true);

            migrationBuilder.AddColumn<List<Guid>>(
                name: "fire_station_report_file_ids",
                schema: "damage",
                table: "incidents",
                type: "uuid[]",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "has_fire_station_report",
                schema: "damage",
                table: "incidents",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "has_police_report",
                schema: "damage",
                table: "incidents",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "has_weather_report",
                schema: "damage",
                table: "incidents",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "police_report_date",
                schema: "damage",
                table: "incidents",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<List<Guid>>(
                name: "police_report_file_ids",
                schema: "damage",
                table: "incidents",
                type: "uuid[]",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "police_report_number",
                schema: "damage",
                table: "incidents",
                type: "character varying(1000)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "weather_condition",
                schema: "damage",
                table: "incidents",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "weather_report_probability",
                schema: "damage",
                table: "incidents",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "coverage_id",
                schema: "damage",
                table: "damaged_objects",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<List<Guid>>(
                name: "stake_holder_ids",
                schema: "damage",
                table: "damage_claims",
                type: "uuid[]",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "stake_holder",
                schema: "damage",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    first_name = table.Column<string>(type: "character varying(1000)", nullable: false),
                    last_name = table.Column<string>(type: "character varying(1000)", nullable: false),
                    phone_number = table.Column<string>(type: "character varying(1000)", nullable: false),
                    account_number = table.Column<string>(type: "character varying(1000)", nullable: true),
                    iban = table.Column<string>(type: "character varying(1000)", nullable: true),
                    is_owner = table.Column<bool>(type: "boolean", nullable: false),
                    damage_claim_id = table.Column<Guid>(type: "uuid", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_stake_holder", x => x.id);
                    table.ForeignKey(
                        name: "fk_stake_holder_damage_claims_damage_claim_id",
                        column: x => x.damage_claim_id,
                        principalSchema: "damage",
                        principalTable: "damage_claims",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "ix_stored_file_damage_claim_id",
                schema: "damage",
                table: "stored_file",
                column: "damage_claim_id");

            migrationBuilder.CreateIndex(
                name: "ix_stored_file_incident_id1",
                schema: "damage",
                table: "stored_file",
                column: "incident_id1");

            migrationBuilder.CreateIndex(
                name: "ix_stored_file_incident_id2",
                schema: "damage",
                table: "stored_file",
                column: "incident_id2");

            migrationBuilder.CreateIndex(
                name: "ix_damage_claims_ownership_type_id",
                schema: "damage",
                table: "damage_claims",
                column: "ownership_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_stake_holder_damage_claim_id",
                schema: "damage",
                table: "stake_holder",
                column: "damage_claim_id");

            migrationBuilder.AddForeignKey(
                name: "fk_damage_claims_ownership_types_ownership_type_id",
                schema: "damage",
                table: "damage_claims",
                column: "ownership_type_id",
                principalSchema: "damage",
                principalTable: "ownership_types",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_stored_file_damage_claims_damage_claim_id",
                schema: "damage",
                table: "stored_file",
                column: "damage_claim_id",
                principalSchema: "damage",
                principalTable: "damage_claims",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_stored_file_incidents_incident_id1",
                schema: "damage",
                table: "stored_file",
                column: "incident_id1",
                principalSchema: "damage",
                principalTable: "incidents",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_stored_file_incidents_incident_id2",
                schema: "damage",
                table: "stored_file",
                column: "incident_id2",
                principalSchema: "damage",
                principalTable: "incidents",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_damage_claims_ownership_types_ownership_type_id",
                schema: "damage",
                table: "damage_claims");

            migrationBuilder.DropForeignKey(
                name: "fk_stored_file_damage_claims_damage_claim_id",
                schema: "damage",
                table: "stored_file");

            migrationBuilder.DropForeignKey(
                name: "fk_stored_file_incidents_incident_id1",
                schema: "damage",
                table: "stored_file");

            migrationBuilder.DropForeignKey(
                name: "fk_stored_file_incidents_incident_id2",
                schema: "damage",
                table: "stored_file");

            migrationBuilder.DropTable(
                name: "stake_holder",
                schema: "damage");

            migrationBuilder.DropIndex(
                name: "ix_stored_file_damage_claim_id",
                schema: "damage",
                table: "stored_file");

            migrationBuilder.DropIndex(
                name: "ix_stored_file_incident_id1",
                schema: "damage",
                table: "stored_file");

            migrationBuilder.DropIndex(
                name: "ix_stored_file_incident_id2",
                schema: "damage",
                table: "stored_file");

            migrationBuilder.DropIndex(
                name: "ix_damage_claims_ownership_type_id",
                schema: "damage",
                table: "damage_claims");

            migrationBuilder.DropColumn(
                name: "damage_claim_id",
                schema: "damage",
                table: "stored_file");

            migrationBuilder.DropColumn(
                name: "incident_id1",
                schema: "damage",
                table: "stored_file");

            migrationBuilder.DropColumn(
                name: "incident_id2",
                schema: "damage",
                table: "stored_file");

            migrationBuilder.DropColumn(
                name: "other",
                schema: "damage",
                table: "insurable_objects");

            migrationBuilder.DropColumn(
                name: "fire_station_name",
                schema: "damage",
                table: "incidents");

            migrationBuilder.DropColumn(
                name: "fire_station_report_file_ids",
                schema: "damage",
                table: "incidents");

            migrationBuilder.DropColumn(
                name: "has_fire_station_report",
                schema: "damage",
                table: "incidents");

            migrationBuilder.DropColumn(
                name: "has_police_report",
                schema: "damage",
                table: "incidents");

            migrationBuilder.DropColumn(
                name: "has_weather_report",
                schema: "damage",
                table: "incidents");

            migrationBuilder.DropColumn(
                name: "police_report_date",
                schema: "damage",
                table: "incidents");

            migrationBuilder.DropColumn(
                name: "police_report_file_ids",
                schema: "damage",
                table: "incidents");

            migrationBuilder.DropColumn(
                name: "police_report_number",
                schema: "damage",
                table: "incidents");

            migrationBuilder.DropColumn(
                name: "weather_condition",
                schema: "damage",
                table: "incidents");

            migrationBuilder.DropColumn(
                name: "weather_report_probability",
                schema: "damage",
                table: "incidents");

            migrationBuilder.DropColumn(
                name: "stake_holder_ids",
                schema: "damage",
                table: "damage_claims");

            migrationBuilder.AlterColumn<Guid>(
                name: "coverage_id",
                schema: "damage",
                table: "damaged_objects",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "stake_holder_id",
                schema: "damage",
                table: "damage_claims",
                type: "uuid",
                nullable: true);
        }
    }
}
