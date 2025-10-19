# ADR-012: Adopt Module Contracts Pattern for Inter-Module Communication

## Status
Decided

## Context
Our modular monolith architecture requires controlled communication between modules (Users, Damage, Insurance) while maintaining module independence and clear boundaries. Modules need to access functionality and data from other modules without creating tight coupling or circular dependencies. The previous approach of placing shared DTOs in the Common module violated Single Responsibility Principle, as Common became a dumping ground for cross-module concerns rather than truly common utilities. We need an architecture that supports potential future extraction to microservices while keeping development velocity high in the current monolithic structure.

## Decision
We will implement the **Module Contracts Pattern** where each module exposes its public API through a dedicated `.Contracts` project containing interfaces, DTOs, and shared types. Other modules interact exclusively through these contract definitions, with implementations residing in the source module's Application layer.

### Contract Structure
Each module will have a `{Module}.Contracts` project with:
- `ModuleServices/` - Service interface definitions (e.g., `IUsersModuleService`)
- `Dtos/` - Data Transfer Objects specific to that module's contract
- `Enums/` - Shared enumerations required by the module's DTOs

### Implementation Pattern
- Service implementations live in `{Module}.Application/Services/`
- Implementations are registered in the module's DI container via `ModuleInstaller`
- Consuming modules add project references only to the Contracts project, never to Application or Domain layers

## Rationale

**Clear Module Ownership and Boundaries**
- Each module owns its contracts, DTOs, and enums in its own namespace
- UserDto belongs to Users.Contracts, not a shared Common project
- Explicit declaration of what functionality a module exposes to others
- Eliminates ambiguity about where shared types should live

**Controlled Inter-Module Dependencies**
- Compile-time visibility of module dependencies through project references
- Prevents accidental coupling to internal implementation details
- Only Contracts projects can be referenced across module boundaries
- Makes architectural violations visible immediately during build

**Alignment with Future Microservices Migration**
- Contracts represent the published API surface that would become REST/gRPC endpoints
- Clear separation between public API (Contracts) and internal implementation
- DTOs in Contracts are already designed for serialization and network transfer
- Each module's Contracts project can evolve into an API client package

**Maintains Single Responsibility for Common Module**
- Common module returns to its intended purpose: framework-level utilities and abstractions
- Module-specific concerns stay within their respective module boundaries
- Reduces risk of Common becoming a "big ball of mud" dumping ground

**Testability and Maintainability**
- Easy to mock module service interfaces for testing consumer modules
- Changes to internal implementation don't affect consumers if contracts remain stable
- Version contracts independently from implementations
- Clear contracts make integration testing straightforward

## Consequences

### Positive
- Clear ownership of types and functionality per module
- Explicit and controlled inter-module dependencies
- Facilitates future microservices extraction with minimal refactoring
- Common module maintains single responsibility for framework concerns
- Easy to identify and manage module coupling through project references
- Better testability through well-defined interface boundaries
- Supports contract versioning and backward compatibility strategies

### Negative
- Additional projects to manage (one Contracts project per module)
- Increased number of project references to configure
- Learning curve for developers unfamiliar with the pattern
- Potential for contract duplication if similar types needed across modules
- Need discipline to avoid leaking domain models into Contracts

### Implementation Notes
- Create `{Module}.Contracts` class library projects targeting net9.0
- Structure: `src/Modules/{Module}/FireInsurance.{Module}.Contracts/`
- Add Ardalis.Result package to Contracts for consistent return types
- Naming conventions:
  - Interfaces: `I{Module}ModuleService` (e.g., `IUsersModuleService`)
  - Implementations: `{Module}ModuleService` in Application/Services/
  - DTOs: Use `init` accessors for immutability
- Register implementations in module's `ModuleInstaller` as scoped services
- Module references:
  - Domain → Contracts (for enums needed in domain entities)
  - Application → Contracts (for service implementations)
  - Consumer.Application → Provider.Contracts (for cross-module calls)
- Avoid exposing domain entities directly; always use DTOs in Contracts
- Consider creating mapping extensions in Application layer for Entity → DTO conversions
- Document contract breaking changes and version appropriately

## Alternatives Considered

**Keep DTOs in Common Module**
- Rejected: Violates SRP, creates unclear ownership, makes Common a coupling point
- Would prevent clean future microservices extraction

**Integration Events (Event-Driven Architecture)**
- Considered for future: Provides true decoupling and eventual consistency
- Rejected for now: Adds complexity, requires message broker infrastructure, eventual consistency may not suit all use cases
- Remains an option for specific async workflows

**Separate Shared Kernel Package**
- Rejected: Over-engineering for current team size and system complexity
- Module Contracts provide sufficient separation without additional infrastructure

**Direct Module-to-Module References**
- Rejected: Creates tight coupling, prevents independent deployment, makes testing difficult
- Would violate Clean Architecture dependency rules

## References
- Modular Monolith Architecture by Kamil Grzybek
- Microsoft eShopOnContainers - Integration Events Pattern
- Clean Architecture by Robert Martin - Crossing Boundaries
- Building Microservices by Sam Newman - API Gateways and Service Boundaries
