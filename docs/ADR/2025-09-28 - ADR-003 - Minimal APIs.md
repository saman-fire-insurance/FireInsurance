## ADR-003: Adopt Minimal APIs for API Layer Implementation

### Status
Decided

### Context
We need to implement our API layer for a system using CQRS with MediatR and Rich Domain Model patterns. The API layer requires flexible security features including granular rate limiting and custom middleware integration for different endpoint types.

### Decision
We will use **Minimal APIs** as our API framework for implementing HTTP endpoints.

### Rationale

**Architectural Alignment with CQRS**
- Endpoints serve as thin adapters between HTTP requests and MediatR handlers
- Direct request-to-command/query mapping aligns well with CQRS principles
- Reduces abstraction layers in the request processing pipeline
- Simple flow from HTTP request to business logic handlers

**Security and Rate Limiting Flexibility**
- Full access to ASP.NET Core's rate limiting policies with per-endpoint configuration
- Support for multiple rate limiting strategies (fixed window, sliding window, token bucket)
- Easy integration of custom security middleware and endpoint filters
- Flexible authentication and authorization policy application per endpoint

**Maintainability and Performance**
- Zero third-party dependencies with built-in .NET support
- Excellent performance characteristics for high-throughput scenarios
- Simple debugging path from HTTP request to business logic
- Long-term support and stability guaranteed by Microsoft

### Consequences

#### Positive
- Maximum flexibility for security and rate limiting configurations
- Strong performance with minimal overhead and abstraction
- Clear separation between HTTP concerns and business logic
- No additional dependencies to manage or maintain
- Direct integration with ASP.NET Core middleware pipeline

#### Negative
- Manual setup required for request validation patterns
- Need to establish team conventions for endpoint organization
- Less built-in structure compared to class-based endpoint frameworks
- Potential for Program.cs to become large without proper organization

#### Implementation Notes
- Create extension methods for endpoint registration to organize Program.cs
- Implement request validation through MediatR pipeline behaviors
- Establish coding standards for endpoint structure and security configuration
- Use endpoint filters for cross-cutting concerns like logging and error handling

### References
- ASP.NET Core Minimal APIs Documentation
- ASP.NET Core Rate Limiting Documentation
- MediatR Pipeline Behaviors Documentation