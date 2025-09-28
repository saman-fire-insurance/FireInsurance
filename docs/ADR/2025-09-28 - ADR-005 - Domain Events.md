# ADR-005: Adopt Domain Events with MediatR INotification for Cross-Cutting Concerns Integration

## Status
Decided

## Context
Our Rich Domain Model implementation requires a way to handle side effects and integration concerns when domain state changes occur. We need to decouple business logic from infrastructure concerns like SMS notifications, email services, analytics tracking, and audit logging while maintaining Clean Architecture principles. The system must support complex workflows, eventual consistency patterns, and automatic handler discovery without manual event routing maintenance. After evaluating pure domain approaches versus pragmatic framework integration, we need to balance domain purity with developer productivity and maintainability.

## Decision
We will adopt **Domain Events** using the `IDomainEvent` interface that extends MediatR's `INotification`, enabling automatic handler discovery and processing through MediatR's notification system for cross-cutting concerns integration.

## Rationale

**Decoupling Domain Logic from Side Effects**
- Domain entities focus purely on business rules and state management
- Infrastructure concerns (SMS, email, analytics) are handled separately from domain logic through dedicated event handlers
- Domain publishes facts about what happened without knowing how they should be processed
- Eliminates tight coupling between business logic and external services while maintaining clean separation of concerns

**Clean Architecture with Pragmatic MediatR Integration**
- Domain events are raised in the Domain layer as data structures implementing INotification
- Event handlers reside in the Application layer where infrastructure dependencies are allowed
- Maintains proper dependency flow while enabling automatic handler discovery
- Minimal coupling cost (empty marker interface) provides significant productivity benefits over custom event dispatching

**Automatic Handler Discovery and Extensibility**
- New integration requirements can be added through new event handlers without modifying domain logic or command handlers
- MediatR automatically discovers and registers all INotificationHandler implementations at startup
- Multiple handlers can respond to the same domain event independently and in parallel
- Follows Open/Closed Principle - open for extension, closed for modification of existing code

**Developer Productivity and Industry Standards**
- Leverages well-established MediatR patterns familiar to .NET developers
- Eliminates manual event routing, switch statements, and handler registration in command handlers
- Superior debugging and tooling support compared to custom event dispatching solutions
- High performance with optimized handler resolution and execution by proven MediatR framework

## Consequences

### Positive
- Clean separation between business logic and integration concerns
- Automatic handler discovery eliminates manual event routing maintenance
- Multiple handlers can process same event independently for different concerns
- High developer productivity through established patterns and minimal boilerplate
- Excellent testability with isolated domain logic and mockable event handlers
- Easy to extend with new integrations without modifying existing domain or command code
- Industry-standard approach with superior tooling and debugging support

### Negative
- Domain layer has minimal dependency on MediatR INotification interface
- Learning curve for developers unfamiliar with domain events and MediatR patterns
- Additional complexity compared to direct service calls within domain methods
- Potential for increased number of classes and files to maintain
- Risk of orphaned events if handlers are not properly implemented or registered

### Implementation Notes
- Define `IDomainEvent` interface extending `INotification` with `Id` and `OccurredOn` properties for consistency
- Create domain event classes in `Domain/Events/` folder structure implementing `IDomainEvent`
- Implement event handlers in `Application/EventHandlers/` using `INotificationHandler<T>` with infrastructure dependencies
- Process domain events in command handlers using `_mediator.Publish()` after successful persistence
- Register MediatR in Program.cs with `AddMediatR()` for automatic handler discovery and registration
- Establish naming conventions: `{Entity}{Action}DomainEvent` (e.g., `UserRegisteredDomainEvent`)
- Clear domain events after processing to prevent duplicate handling during same request
- Accept minimal MediatR coupling in domain layer for significant productivity and maintainability gains
- Include error handling in event handlers to prevent side effect failures from breaking main operations

## References
- Domain-Driven Design by Eric Evans
- Clean Architecture by Robert Martin
- MediatR Documentation and INotificationHandler Patterns
- Enterprise Integration Patterns by Gregor Hohpe