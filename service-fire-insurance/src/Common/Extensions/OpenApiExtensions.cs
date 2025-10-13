using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi;
using Microsoft.OpenApi.Interfaces;
using Microsoft.OpenApi.Models;
using Microsoft.OpenApi.Writers;
using SwaggerHierarchySupport;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Text.Json;

namespace Common.Extensions;

public static partial class Extensions
{
    public static IApplicationBuilder UseDefaultOpenApi(this WebApplication app)
    {
       var configuration = app.Configuration;
        var openApiSection = configuration.GetSection("OpenApi");

        var apiUrl = configuration.GetSection("ApiSettings")["BaseUrl"];
        var webUrl = configuration.GetSection("WebAppSettings")["BaseUrl"];

        if (app.Environment.IsDevelopment())
        {
            app.MapGet("/", (HttpContext context) => Results.Redirect("/swagger")).ExcludeFromDescription();
        }
        else
        {
            app.MapGet("/", (HttpContext context) =>
            {
                if (!string.Equals(context.Request.Host.Host, new Uri(webUrl).Host, StringComparison.OrdinalIgnoreCase))
                {
                    return Results.Redirect(webUrl);
                }

                return Results.Ok();
            }).ExcludeFromDescription();

            return app;
        }

        if (!openApiSection.Exists())
        {
            return app;
        }

        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            /// {
            ///   "OpenApi": {
            ///     "Endpoint: {
            ///         "Name": 
            ///     },
            ///     "Auth": {
            ///         "ClientId": ..,
            ///         "AppName": ..
            ///     }
            ///   }
            /// }

            var pathBase = configuration["PATH_BASE"];
            var authSection = openApiSection.GetSection("Auth");
            var endpointSection = openApiSection.GetRequiredSection("Endpoint");

            var swaggerUrl = endpointSection["Url"] ?? $"{(!string.IsNullOrEmpty(pathBase) ? pathBase : string.Empty)}/swagger/v1/swagger.json";

            options.SwaggerEndpoint(swaggerUrl, endpointSection.GetRequiredValue("Name"));

            var identitySection = configuration.GetSection("Identity");

            if (identitySection.Exists() || authSection.Exists())
            {
                var scopes = identitySection.GetRequiredSection("Scopes").GetChildren().ToDictionary(p => p.Key, p => p.Value);

                if (scopes.ContainsKey("gatewayapi"))
                {
                    options.OAuthAppName(authSection.GetRequiredValue("AppName"));
                    options.OAuthClientId(authSection.GetRequiredValue("ClientId"));
                    options.OAuthClientSecret(authSection.GetRequiredValue("ClientSecret"));
                    options.OAuthUsePkce();
                    options.OAuthScopes([.. scopes.Keys]);
                }

                if (scopes.ContainsKey("automation"))
                {
                    options.OAuthAppName(authSection.GetRequiredValue("AppName"));
                    options.OAuthClientId(authSection.GetRequiredValue("ClientId"));
                    options.OAuthClientSecret(authSection.GetRequiredValue("ClientSecret"));
                    options.OAuthScopes([.. scopes.Keys]);
                }
            }

            // Show hierarchy tags [Tag]:[SubTag] in swagger UI
            options.AddHierarchySupport();
        });

        return app;
    }

    public static IHostApplicationBuilder AddDefaultOpenApi(this IHostApplicationBuilder builder)
    {
        var services = builder.Services;
        var configuration = builder.Configuration;

        var openApiSection = configuration.GetSection("OpenApi");
        if (!openApiSection.Exists())
        {
            return builder;
        }

        services.AddEndpointsApiExplorer();

        services.AddSwaggerGen(options =>
        {
            /// {
            ///   "OpenApi": {
            ///     "Document": {
            ///         "Title": ..
            ///         "Version": ..
            ///         "Description": ..
            ///     }
            ///   }
            /// }
            var document = openApiSection.GetRequiredSection("Document");

            var version = document.GetRequiredValue("Version") ?? "v1";

            options.SwaggerDoc(version, new OpenApiInfo
            {
                Title = document.GetRequiredValue("Title"),
                Version = version,
                Description = document.GetRequiredValue("Description"),
            });

            //var identitySection = configuration.GetSection("Identity");
            //if (!identitySection.Exists())
            //{
            //    return;
            //}

            //var identityUrlExternal = identitySection.GetRequiredValue("Issuer");

            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                Scheme = JwtBearerDefaults.AuthenticationScheme,
                BearerFormat = "JWT",
                Description = "Enter your JWT token in the format: Bearer {your token}"
            });

            options.OperationFilter<AuthorizeCheckOperationFilter>(/*[scopes.Keys.ToArray()]*/);
            options.SchemaFilter<EnumerationSchemaFilter>();
        });

        return builder;
    }

    private sealed class AuthorizeCheckOperationFilter() : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var hasAuthorization = context.ApiDescription.ActionDescriptor.EndpointMetadata.Any(em => em is IAuthorizeData);
            if (!hasAuthorization)
            {
                return;
            }

            operation.Responses.TryAdd("401", new OpenApiResponse { Description = "Unauthorized" });
            operation.Responses.TryAdd("403", new OpenApiResponse { Description = "Forbidden" });

            var bearerScheme = new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            };

            operation.Security =
            [
                new()
                {
                    [bearerScheme] = Array.Empty<string>()
                }
            ];

            /*
            //var oAuthScheme = new OpenApiSecurityScheme
            //{
            //    Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "oauth2" }
            //};


            //operation.Security = new List<OpenApiSecurityRequirement>
            //{
            //    new()
            //    {
            //        [ oAuthScheme ] = scopes
            //    }
            //};
            */
        }
    }

    public class EnumerationSchemaFilter : ISchemaFilter
    {
        public void Apply(OpenApiSchema schema, SchemaFilterContext context)
        {
            ArgumentNullException.ThrowIfNull(schema);

            ArgumentNullException.ThrowIfNull(context);

            if (context.Type.IsEnum)
            {
                schema.Extensions.Add("x-enum-varnames", new EnumerationOpenApiExtension(context));
            }
        }
    }

    public class EnumerationOpenApiExtension(SchemaFilterContext context) : IOpenApiExtension
    {
        private readonly SchemaFilterContext _context = context;

        public void Write(IOpenApiWriter writer, OpenApiSpecVersion specVersion)
        {
            var enums = Enum.GetNames(_context.Type);

            var options = new JsonSerializerOptions() { WriteIndented = true };

            var value = JsonSerializer.Serialize(enums, options);

            writer.WriteRaw(value);
        }
    }
}
