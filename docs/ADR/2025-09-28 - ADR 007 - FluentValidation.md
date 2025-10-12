# ADR-007: Adopt FluentValidation for Request Validation

## Status
Decided

## Context
Our CQRS implementation with MediatR requires robust request validation before commands and queries reach their handlers. We need a validation approach that is maintainable, testable, type-safe, and provides clear error messages to API consumers. The solution must integrate seamlessly with our existing architecture including MediatR pipeline behaviors, Ardalis.Result pattern, and Minimal APIs. Validation logic should be separated from business logic and be easily reusable across different layers when needed.

## Decision
We will adopt **FluentValidation** as our request validation library, integrated through MediatR pipeline behaviors to automatically validate all commands and queries before they reach their handlers.

## Rationale

**Separation of Concerns**
- Validation logic is completely separated from business logic and command/query handlers
- Validators are independent classes that can be tested in isolation
- Keeps command and query objects clean and focused on data transfer
- Domain entities focus on business rules while validators handle input validation

**Type-Safe and Expressive Validation Rules**
- Strongly-typed validation rules provide compile-time safety
- Fluent interface makes validation rules highly readable and self-documenting
- Rich set of built-in validators for common scenarios (email, phone, regex, ranges)
- Easy to create custom validators for domain-specific rules
- Validation logic reads like natural language making it accessible to non-technical stakeholders

**Excellent Integration with Our Architecture**
- Native support for MediatR pipeline behaviors for automatic validation
- Seamless integration with Ardalis.Result for consistent error handling
- Works perfectly with dependency injection for complex validation scenarios
- Easy integration with Minimal APIs for automatic validation error responses
- Compatible with our existing CQRS pattern without modification

**Superior Developer Experience**
- IntelliSense support for discovering available validation rules
- Clear and detailed error messages out of the box
- Easy to customize error messages for localization and user experience
- Comprehensive documentation and large community support
- Industry-standard tool familiar to most .NET developers

## Consequences

### Positive
- Clean separation between validation logic and business logic
- Consistent validation approach across all commands and queries
- Automatic validation through MediatR pipeline eliminates manual validation code
- Excellent testability with isolated validator unit tests
- Type-safe validation rules prevent common validation mistakes
- Rich built-in validators reduce custom validation code
- Easy to maintain and extend validation rules over time
- Clear and actionable error messages for API consumers

### Negative
- Additional NuGet package dependency to manage
- Learning curve for developers unfamiliar with FluentValidation syntax
- Validation errors occur at runtime rather than compile-time
- Slight performance overhead from reflection-based validation (negligible in practice)
- May require additional configuration for complex validation scenarios

### Implementation Notes
- Create validator classes inheriting from AbstractValidator<T> in Application layer
- Register validators using AddValidatorsFromAssembly() in Program.cs
- Implement ValidationBehavior as MediatR pipeline behavior for automatic validation
- Integrate validation errors with Ardalis.Result.Invalid() for consistent error handling
- Establish naming convention: {CommandOrQuery}Validator for validator classes
- Place validators in Application/Validators folder structure organized by feature
- Use RuleFor() for property-level validation rules
- Use When() and Unless() for conditional validation logic
- Create custom validators by extending AbstractValidator or implementing IValidator
- Configure validation to stop on first failure or continue collecting all errors based on use case
- Use SetValidator() for complex object validation and RuleForEach() for collections
- Leverage async validation (MustAsync) for database-dependent validation rules sparingly

## References
- FluentValidation Official Documentation
- MediatR Pipeline Behaviors Documentation
- ASP.NET Core Validation Best Practices
- Ardalis.Result Integration Patterns