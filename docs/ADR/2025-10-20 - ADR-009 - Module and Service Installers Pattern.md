# ADR-009: Adopt Module and Service Installers Pattern for Dependency Injection

## Status
Decided

## Context
Our modular monolith architecture requires a scalable and organized approach to dependency injection (DI) configuration. As the system grows with multiple modules (Users, Damage, Insurance), each containing multiple services with their own infrastructure dependencies, we need a pattern that:
- Keeps DI registration organized and maintainable
- Allows each module to manage its own dependencies independently
- Supports different configurations per environment (Development, Staging, Production)
- Provides a clear hierarchical structure that scales with module and service growth
- Makes it easy to discover what services are registered and where

Without a structured approach, dependency registration tends to accumulate in a single startup file, becoming difficult to maintain and understand as the application grows.

## Decision
We will implement a **two-tier installer pattern** for dependency injection:

1. **Module Installers**: Each module has a single `ModuleInstaller` implementing `IModuleInstaller` that orchestrates all service registrations for that module
2. **Service Installers**: Within each module, individual services/concerns have dedicated static extension methods (`ServiceInstaller`) that handle their specific DI registrations

### Pattern Structure
```
Module.API/
  └── ModuleInstaller/
      └── {Module}ModuleInstaller.cs  // Implements IModuleInstaller

Module.Infrastructure/
  └── Services/
      └── {ServiceName}/
          └── {ServiceName}ServiceInstaller.cs  // Static extension methods

Module.Application/
  └── Services/
      └── {ServiceName}/
          └── {ServiceName}ServiceInstaller.cs  // Static extension methods
```

### Usage Pattern
```csharp
// In Program.cs
services.Install(configuration, environment);  // Discovers and installs all modules

// In ModuleInstaller
public void Install(IServiceCollection services, IConfiguration configuration, IHostEnvironment environment)
{
    services.AddValidators(AssemblyReference.Assembly);
    services.AddDatabase(configuration);
    services.AddFileService(configuration, environment);
    services.AddUsersModuleService(configuration, environment);
}

// In ServiceInstaller
public static void AddFileService(this IServiceCollection services, IConfiguration configuration, IHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        services.TryAddScoped<IFileService, MockFileService>();
    }
    else
    {
        services.TryAddScoped<IFileService, FileService>();
    }
}
```

## Rationale

**Clear Hierarchical Organization**
- Module-level orchestration through `ModuleInstaller` provides a single entry point per module
- Service-level installers encapsulate registration logic for specific concerns
- Easy to navigate: want to know what a module registers? Check its `ModuleInstaller`
- Easy to maintain: need to change how a service is registered? Find its `ServiceInstaller`

**Module Independence**
- Each module controls its own dependency registration completely
- Modules can be developed, tested, and configured independently
- Clear module boundaries enforced through installer organization
- Supports future extraction to separate deployable units

**Environment-Specific Configuration**
- Service installers receive `IConfiguration` and `IHostEnvironment` parameters
- Environment-specific logic (Development vs Production) encapsulated at the service level
- Mock implementations easily swapped in Development
- Production-ready services deployed without code changes

**Scalability and Discoverability**
- Pattern scales linearly with module and service growth
- No single "god class" for DI configuration
- New developers can easily understand what's registered by following the hierarchy
- Reduces merge conflicts as different teams work on different modules

**Consistency and Convention**
- Naming convention: `Add{ServiceName}` for service installers
- Standard signature: `(IServiceCollection, IConfiguration, IHostEnvironment)`
- Use of `TryAdd*` methods prevents duplicate registrations
- Consistent pattern across all modules makes codebase predictable

**Separation of Concerns**
- Infrastructure concerns (database, caching, external APIs) have dedicated installers
- Application concerns (module services, validators) have dedicated installers
- Each installer is responsible for a single cohesive set of registrations

## Consequences

### Positive
- Clean, organized dependency registration that scales with application growth
- Module independence and clear boundaries
- Easy to understand what each module and service requires
- Environment-specific configuration handled elegantly
- Reduced startup.cs/Program.cs complexity
- Better testability - can test installer behavior in isolation
- Supports parallel development across teams working on different modules
- Facilitates future microservices extraction with minimal refactoring

### Negative
- Additional boilerplate for smaller applications with few modules
- Developers need to understand the two-tier pattern
- Slight indirection - must navigate from ModuleInstaller to ServiceInstaller to see specific registrations
- Potential for inconsistent naming if conventions aren't followed

### Implementation Notes

**Module Installer Conventions:**
- File: `{Module}.API/ModuleInstaller/{Module}ModuleInstaller.cs`
- Class: `internal sealed class {Module}ModuleInstaller : IModuleInstaller`
- Method: `Install(IServiceCollection services, IConfiguration configuration, IHostEnvironment environment)`
- Responsibility: Orchestrate all service installer calls for the module

**Service Installer Conventions:**
- File: Located alongside service implementation (Infrastructure or Application layer)
- Naming: `{ServiceName}ServiceInstaller.cs` or `{ServiceName}Installer.cs`
- Method: `public static void Add{ServiceName}(this IServiceCollection services, IConfiguration configuration, IHostEnvironment env)`
- Use `sealed` classes for service installers if using classes instead of static extension methods
- Use `TryAdd*` methods to prevent duplicate service registrations
- Handle environment-specific logic within the service installer

**IModuleInstaller Interface:**
```csharp
public interface IModuleInstaller
{
    void Install(IServiceCollection services, IConfiguration configuration, IHostEnvironment environment);
}
```

**Future Considerations:**
- Consider introducing `IServiceInstaller` interface for consistency and tooling support
- May add validation to ensure all installers are properly registered
- Could add telemetry/logging to track which modules and services are installed

**Registration Discovery:**
The `Common.Installers.ModuleInstaller` class scans assemblies for `IModuleInstaller` implementations and registers them automatically:
```csharp
services.Install(configuration, environment);  // Extension method that discovers all module installers
```

## Alternatives Considered

**Single Program.cs Registration**
- Rejected: Doesn't scale, becomes unmaintainable with multiple modules
- All DI configuration in one place leads to merge conflicts and unclear ownership

**Per-Layer Installers Only**
- Rejected: Too coarse-grained, loses service-level encapsulation
- Example: Single `InfrastructureInstaller` for all infrastructure concerns doesn't provide enough organization

**AutoMapper/Scrutor-style Auto-Registration**
- Considered for future: Convention-based automatic service registration
- Rejected for now: Less explicit, harder to debug, requires careful convention design
- Explicit installers provide better discoverability and control

**Module-Only Pattern (No Service Installers)**
- Rejected: Module installers would become too large and complex
- Loses service-level encapsulation and environment-specific logic benefits

## References
- Modular Monolith Architecture by Kamil Grzybek
- Clean Architecture by Robert Martin - Dependency Inversion and Plugin Architecture
- ASP.NET Core Dependency Injection Best Practices - Microsoft Documentation
- Vertical Slice Architecture patterns for organizing features and their dependencies
