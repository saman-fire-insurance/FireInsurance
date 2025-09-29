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

namespace Shila.ServiceDefaults;

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

        var openApi = configuration.GetSection("OpenApi");

        if (!openApi.Exists())
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
            var document = openApi.GetRequiredSection("Document");

            var version = document.GetRequiredValue("Version") ?? "v1";

            options.SwaggerDoc(version, new OpenApiInfo
            {
                Title = document.GetRequiredValue("Title"),
                Version = version,
                Description = document.GetRequiredValue("Description")
            });

            var identitySection = configuration.GetSection("Identity");

            if (!identitySection.Exists())
            {
                // No identity section, so no authentication open api definition
                return;
            }

            // {
            //   "Identity": {
            //     "Url": "http://identity",
            //     "Scopes": {
            //         "basket": "Basket API"
            //      }
            //    }
            // }

            var identityUrlExternal = identitySection.GetRequiredValue("Issuer");
            var scopes = identitySection.GetRequiredSection("Scopes").GetChildren().ToDictionary(p => p.Key, p => p.Value);

            if (scopes.ContainsKey("gatewayapi"))
            {
                options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,
                    Flows = new OpenApiOAuthFlows()
                    {
                        // TODO: Change this to use Authorization Code flow with PKCE
                        AuthorizationCode = new OpenApiOAuthFlow()
                        {
                            AuthorizationUrl = new Uri($"{identityUrlExternal}/connect/authorize"),
                            TokenUrl = new Uri($"{identityUrlExternal}/connect/token"),
                            Scopes = scopes,
                        }
                    }
                });
            }

            if (scopes.ContainsKey("automation"))
            {
                options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,
                    Flows = new OpenApiOAuthFlows()
                    {
                        Password = new OpenApiOAuthFlow()
                        {
                            AuthorizationUrl = new Uri($"{identityUrlExternal}/connect/authorize"),
                            TokenUrl = new Uri($"{identityUrlExternal}/connect/token"),
                            Scopes = scopes,
                        }
                    }
                });
            }

            options.OperationFilter<AuthorizeCheckOperationFilter>([scopes.Keys.ToArray()]);
            options.SchemaFilter<EnumerationSchemaFilter>();
        });

        return builder;
    }

    private sealed class AuthorizeCheckOperationFilter(string[] scopes) : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            //var metadata = context.ApiDescription.ActionDescriptor.EndpointMetadata;

            //if (!metadata.OfType<IAuthorizeData>().Any())
            //{
            //    return;
            //}

            operation.Responses.TryAdd("401", new OpenApiResponse { Description = "Unauthorized" });
            operation.Responses.TryAdd("403", new OpenApiResponse { Description = "Forbidden" });

            var oAuthScheme = new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "oauth2" }
            };

            operation.Security = new List<OpenApiSecurityRequirement>
            {
                new()
                {
                    [ oAuthScheme ] = scopes
                }
            };
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

    public class EnumerationOpenApiExtension : IOpenApiExtension
    {
        private readonly SchemaFilterContext _context;

        public EnumerationOpenApiExtension(SchemaFilterContext context)
        {
            _context = context;
        }

        public void Write(IOpenApiWriter writer, OpenApiSpecVersion specVersion)
        {
            var enums = Enum.GetNames(_context.Type);

            var options = new JsonSerializerOptions() { WriteIndented = true };

            var value = JsonSerializer.Serialize(enums, options);

            writer.WriteRaw(value);
        }
    }
}
