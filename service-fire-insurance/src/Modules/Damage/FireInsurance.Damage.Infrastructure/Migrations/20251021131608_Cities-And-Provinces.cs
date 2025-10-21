using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FireInsurance.Damage.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CitiesAndProvinces : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "provinces",
                schema: "damage",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(1000)", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_provinces", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "cities",
                schema: "damage",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(1000)", nullable: false),
                    province_id = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_cities", x => x.id);
                    table.ForeignKey(
                        name: "fk_cities_provinces_province_id",
                        column: x => x.province_id,
                        principalSchema: "damage",
                        principalTable: "provinces",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_cities_province_id",
                schema: "damage",
                table: "cities",
                column: "province_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "cities",
                schema: "damage");

            migrationBuilder.DropTable(
                name: "provinces",
                schema: "damage");
        }
    }
}
