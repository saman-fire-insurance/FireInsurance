# ADR-008: Adopt Mapster for Object Mapping

## Status
Decided

## Context
Our application requires mapping between different object types across layers: domain entities to DTOs, commands to domain objects, and database models to response objects. We need a solution that handles complex nested mappings, supports efficient database projections for joins and aggregations, and provides good performance while reducing boilerplate code. The solution must be free for commercial use and integrate well with our existing architecture including Entity Framework Core, CQRS pattern, and Ardalis.Result.

## Decision
We will adopt **Mapster** as our object-to-object mapping solution throughout the application.

## Rationale

**Efficient IQueryable Projections for Database Performance**
- ProjectToType() support translates mappings directly to SQL SELECT statements
- Critical for complex joins across multiple tables (User → Profile → Policies → Claims)
- Significantly reduces data transfer by selecting only required columns
- Essential for insurance domain with complex aggregations and reporting needs

**Excellent Performance with Minimal Overhead**
- Compiles mappings to cached expressions for fast runtime execution
- Performance comparable to hand-written code for most scenarios
- Faster than AutoMapper while maintaining ease of use
- Minimal memory allocation and GC pressure

**Reduced Boilerplate for Complex Scenarios**
- Concise configuration syntax for complex nested mappings
- Convention-based mapping handles simple scenarios automatically
- Easy to define custom mapping logic inline
- Significantly less code compared to Mapperly for complex mappings

**Free and Open Source**
- MIT License - completely free for commercial use with no restrictions
- Active development and responsive maintainer
- Growing community and good documentation
- No licensing costs unlike AutoMapper

## Consequences

### Positive
- Efficient database query generation through IQueryable projections
- Excellent performance with compiled expression trees
- Significantly reduced boilerplate code for complex mappings
- No licensing costs or commercial restrictions
- Easy to configure and maintain complex nested mappings
- Works seamlessly with dependency injection
- Good balance between performance and developer productivity

### Negative
- Runtime mapping errors rather than compile-time detection
- Slightly harder to debug compared to compile-time generated code
- Smaller ecosystem compared to AutoMapper
- Configuration must be done at startup before first use
- Less explicit than manually written mapping code

### Implementation Notes
- Configure mappings at application startup using TypeAdapterConfig
- Create static configuration classes organized by feature in Application/Mappings folder
- Use ProjectToType() for Entity Framework Core IQueryable projections to optimize database queries
- Use Adapt() method for in-memory object-to-object mapping
- Register global configuration once at startup before using any mappings
- Use Map() for custom property mappings and complex transformation logic
- Leverage AfterMapping() for post-mapping logic when needed
- Create extension methods (ToDto, ToResponse) for cleaner usage syntax
- Use TypeAdapterConfig.GlobalSettings for application-wide configuration
- Validate critical mappings with unit tests to catch runtime configuration errors
- Use IgnoreNullValues() and PreserveReference() for specific mapping requirements

## Alternatives Considered

**Mapperly**: Rejected despite excellent performance due to lack of IQueryable projection support and excessive boilerplate for complex nested mappings

**AutoMapper**: Rejected due to commercial licensing requirements

**Manual Mapping**: Rejected due to excessive boilerplate and maintenance burden for complex scenarios

## References
- Mapster Official Documentation (https://github.com/MapsterMapper/Mapster)
- Mapster Wiki and Examples
- Entity Framework Core Query Performance Best Practices