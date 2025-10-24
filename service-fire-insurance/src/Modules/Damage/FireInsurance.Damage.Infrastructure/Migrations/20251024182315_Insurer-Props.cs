using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FireInsurance.Damage.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InsurerProps : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "insurer_phone_number",
                schema: "damage",
                table: "damage_claims",
                type: "character varying(1000)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(1000)");

            migrationBuilder.AlterColumn<string>(
                name: "insurer_last_name",
                schema: "damage",
                table: "damage_claims",
                type: "character varying(1000)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(1000)");

            migrationBuilder.AlterColumn<string>(
                name: "insurer_first_name",
                schema: "damage",
                table: "damage_claims",
                type: "character varying(1000)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(1000)");

            migrationBuilder.AddColumn<string>(
                name: "insurer_account_number",
                schema: "damage",
                table: "damage_claims",
                type: "character varying(1000)",
                nullable: true);

            migrationBuilder.AddColumn<DateOnly>(
                name: "insurer_date_of_birth",
                schema: "damage",
                table: "damage_claims",
                type: "date",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "insurer_iban",
                schema: "damage",
                table: "damage_claims",
                type: "character varying(1000)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "insurer_national_id",
                schema: "damage",
                table: "damage_claims",
                type: "character varying(1000)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "insurer_account_number",
                schema: "damage",
                table: "damage_claims");

            migrationBuilder.DropColumn(
                name: "insurer_date_of_birth",
                schema: "damage",
                table: "damage_claims");

            migrationBuilder.DropColumn(
                name: "insurer_iban",
                schema: "damage",
                table: "damage_claims");

            migrationBuilder.DropColumn(
                name: "insurer_national_id",
                schema: "damage",
                table: "damage_claims");

            migrationBuilder.AlterColumn<string>(
                name: "insurer_phone_number",
                schema: "damage",
                table: "damage_claims",
                type: "character varying(1000)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(1000)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "insurer_last_name",
                schema: "damage",
                table: "damage_claims",
                type: "character varying(1000)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(1000)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "insurer_first_name",
                schema: "damage",
                table: "damage_claims",
                type: "character varying(1000)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(1000)",
                oldNullable: true);
        }
    }
}
