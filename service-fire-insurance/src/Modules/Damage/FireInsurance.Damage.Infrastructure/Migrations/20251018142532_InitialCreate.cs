using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FireInsurance.Damage.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "damage");

            migrationBuilder.CreateTable(
                name: "damage_claims",
                schema: "damage",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<string>(type: "character varying(1000)", nullable: false),
                    insurer_first_name = table.Column<string>(type: "character varying(1000)", nullable: false),
                    insurer_last_name = table.Column<string>(type: "character varying(1000)", nullable: false),
                    insurer_phone_number = table.Column<string>(type: "character varying(1000)", nullable: false),
                    serial_number = table.Column<string>(type: "character varying(1000)", nullable: true),
                    code = table.Column<string>(type: "character varying(1000)", nullable: true),
                    phone_number = table.Column<string>(type: "character varying(1000)", nullable: false),
                    file_ids = table.Column<List<Guid>>(type: "uuid[]", nullable: true),
                    incident_id = table.Column<Guid>(type: "uuid", nullable: true),
                    ownership_type_id = table.Column<Guid>(type: "uuid", nullable: true),
                    stake_holder_id = table.Column<Guid>(type: "uuid", nullable: true),
                    status = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_damage_claims", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "damage_claims",
                schema: "damage");
        }
    }
}
