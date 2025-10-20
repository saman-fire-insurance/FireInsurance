# ADR-013: API Security Architecture

## Status
Decided

## Context
Our Fire Insurance platform is a modular monolith API serving mobile and web clients, handling sensitive user data including personal information, insurance claims, and file uploads. The system requires robust security measures to protect against common attack vectors while maintaining developer productivity and API usability.

Key security requirements include:
- Secure authentication for multiple client types (web, mobile)
- Protection against unauthorized access to user data and operations
- Prevention of common web vulnerabilities (CSRF, XSS, injection attacks)
- Secure handling of file uploads
- Protection against automated attacks (bots, brute force)
- Proper secrets management across environments
- Compliance with security best practices for financial/insurance applications

The architecture must balance security rigor with API performance and developer experience.

## Decision
We will implement a **JWT bearer token-based security architecture** with multiple complementary security layers:

1. **Authentication**: JWT bearer tokens (stateless, signed tokens)
2. **Authorization**: Claims-based authorization with role differentiation
3. **CSRF Protection**: Anti-forgery disabled for API endpoints (JWT immunity)
4. **Transport Security**: HTTPS enforcement with HSTS
5. **Input Validation**: FluentValidation pipeline for all commands
6. **Rate Limiting**: Protection against brute force and DoS attacks
7. **File Upload Security**: Content-type validation and file signature verification
8. **Token Revocation**: Redis-backed distributed blacklist

## Rationale

### Authentication Strategy: JWT Bearer Tokens

**Why JWT over Cookie-Based Authentication:**

**Stateless & Scalable**
- No server-side session storage required
- Horizontal scaling without session affinity
- Supports distributed architecture and future microservices migration

**Mobile-Friendly**
- Native mobile apps can easily store and send tokens
- No cookie management complexity in native applications
- Works seamlessly across web and mobile clients

**CSRF-Immune by Design**
- Browsers don't automatically send Authorization headers
- Attackers on evil.com cannot access tokens from our domain
- Eliminates entire class of CSRF vulnerabilities

**Cross-Domain API Support**
- Works across different domains (api.domain.com, app.domain.com)
- CORS policies provide sufficient cross-origin protection
- Bearer tokens must be explicitly included in requests

**Implementation Details:**
- Algorithm: HMAC SHA-256 (HS256)
- Access token expiration: 60 minutes (configurable)
- Refresh token expiration: 1 day (configurable)
- Claims included: `sub` (user ID), `phone_number`, `jti` (JWT ID), `is_admin`, `is_super_admin`
- Token validation: Signature, issuer, audience, lifetime all verified
- Clock skew tolerance: 60 seconds

### Authorization Strategy: Claims-Based Access Control

**Why Claims-Based Authorization:**

**Flexible & Extensible**
- Claims embedded in JWT payload
- No database lookup required for basic authorization checks
- Easy to extend with new claim types (permissions, roles, features)

**Performance**
- Authorization decisions made without database round-trips
- Claims validated as part of JWT validation pipeline
- Minimal overhead per request

**Clear Role Hierarchy**
- Standard users: Basic authenticated access
- Admins: `is_admin` claim
- Super Admins: `is_super_admin` claim
- Future: Fine-grained permissions via `permission` claim type

**Implementation:**
- Claims provider (`ClaimsProvider`) extracts user context from HTTP request
- Endpoints protected via `.RequireAuthorization()` in minimal APIs
- Custom claim types: `is_admin`, `is_super_admin`, `permission` (reserved)

### CSRF Protection Strategy: Disabled Anti-Forgery

**Why Anti-Forgery is Disabled:**

**JWT Authentication is CSRF-Immune**

CSRF attacks work by exploiting automatic credential submission:
```html
<!-- Malicious site evil.com -->
<form action="https://bank.com/transfer" method="POST">
  <!-- Browser automatically sends cookies to bank.com -->
</form>
```

With JWT bearer tokens:
```javascript
// Client must explicitly include token
fetch('/api/endpoint', {
    headers: {
        'Authorization': 'Bearer eyJhbGc...'  // Evil.com cannot access this token
    }
})
```

**Why This Works:**
- Browsers enforce Same-Origin Policy: evil.com cannot read tokens from insurance.com
- Authorization header is NOT automatically sent like cookies
- Even if evil.com makes a request to our API, it won't have the JWT

**When Anti-Forgery WOULD Be Needed:**
- If using cookie-based authentication (we don't)
- If building server-rendered forms (not in scope for API)
- If browsers automatically send credentials (JWT requires explicit inclusion)

**Trade-off:**
- File upload endpoints accepting `IFormFile` trigger ASP.NET Core's anti-forgery inference
- We explicitly disable with `.DisableAntiforgery()` on these endpoints
- Security maintained through JWT validation + CORS policies

### Transport Security: HTTPS & HSTS

**HTTPS Enforcement:**
- All traffic redirected to HTTPS via `UseHttpsRedirection()`
- Protects JWT tokens in transit from interception
- Prevents man-in-the-middle attacks

**HSTS (HTTP Strict Transport Security):**
- Enabled in production environments
- Forces browsers to always use HTTPS
- Prevents SSL stripping attacks
- Recommended max-age: 1 year (31536000 seconds)

**TLS Configuration:**
- Minimum TLS 1.2 required
- Strong cipher suites preferred
- Certificate management via hosting environment (IIS, Kestrel, reverse proxy)

### Input Validation: FluentValidation Pipeline

**Why FluentValidation:**

**Declarative & Maintainable**
- Validation rules defined alongside commands
- Clear separation of validation logic from business logic
- Type-safe validation with compile-time checking

**Centralized Validation Pipeline**
- `ValidationBehavior<TRequest, TResponse>` intercepts all MediatR commands
- Validation executed before command handler
- Consistent error responses across all endpoints

**Examples:**
```csharp
// Phone number validation
RuleFor(req => req.PhoneNumber)
    .NotEmpty()
    .Length(11)  // Iranian phone format
    .WithMessage(UserErrors.PhoneNumber.Invalid);

// File upload validation
RuleFor(req => req.File)
    .NotEmpty()
    .WithMessage(StoredFileErrors.Empty);
```

**Protection Against:**
- SQL injection (parameterized queries + input validation)
- XSS attacks (validation + proper output encoding)
- Invalid business data (domain rule enforcement)

### File Upload Security

**Content-Type Validation:**
- Magic number/file signature verification (not content-type header alone)
- Whitelist of allowed file types:
  - Images: PNG, JPG, JPEG, HEIC, HEIF
  - Videos: MP4, MOV, AVI, WMM, AVCHD, WebM, FLV, QuickTime
  - Documents: PDF
- File extension validation against actual content

**Size Limits:**
- Maximum file size enforced at framework level
- Prevents DoS via large file uploads

**Storage Security:**
- Files stored outside web root
- Direct file access prevented
- Files served through controlled endpoints with authorization

**Current Status:**
- Infrastructure implemented (`IFileContentTypeValidator`)
- Mock validator active in development
- Production validator requires activation

### Token Revocation: Distributed Blacklist

**Why Token Blacklist:**

**Immediate Revocation Capability**
- JWTs are stateless and valid until expiration
- Need mechanism to invalidate tokens before expiration
- Use cases: Logout, security breach, role changes

**Implementation:**
- Redis-backed distributed cache
- Key format: `blacklist:{jti}` where jti is JWT ID claim
- TTL: Set to token's original expiration time
- Validated on each request before accepting token

**Performance:**
- Redis lookup is fast (microseconds)
- In-memory cache with distributed consistency
- Minimal overhead compared to database session lookup

**Operations:**
- Logout: Add token to blacklist
- Token refresh: Optionally blacklist old token
- Security incident: Batch blacklist compromised tokens

### CORS Configuration

**Policy:**
- Allowed origins: Whitelist specific domains (currently localhost:3000 for development)
- Allow credentials: Enabled (for future cookie support if needed)
- Allow any header: Simplifies client integration
- Allow any method: GET, POST, PUT, DELETE, etc.

**Why This Configuration:**
- Prevents unauthorized cross-origin requests
- Allows legitimate web clients to access API
- Supports future multi-domain deployments
- Credentials allowed maintains flexibility for hybrid auth scenarios

**Environment-Specific:**
- Development: localhost:3000
- Staging: To be configured
- Production: To be configured with actual domains

### Rate Limiting

**Protection Against:**
- Brute force attacks (login, OTP requests)
- DoS attacks (overwhelming API with requests)
- Bot traffic (automated abuse)

**Strategy:**
- Endpoint-specific rate limits
- IP-based throttling
- User-based throttling for authenticated endpoints
- Sliding window or token bucket algorithm

**Current Status:**
- Planned but not yet implemented
- Will be added via ASP.NET Core rate limiting middleware

### Secrets Management

**Current Approach:**
- Options pattern with strongly-typed configuration classes
- Validation at startup (required fields checked)
- Environment-specific configuration files

**Configuration Classes:**
- `JwtOptions`: JWT signing key, issuer, audience, token lifetimes
- `SmsProviderOptions`: SMS service credentials
- `RedisOptions`: Cache connection strings
- `ProxyOptions`: Proxy settings

**Best Practices:**
- Development: appsettings.Development.json or User Secrets
- Production: Environment variables, Azure Key Vault, or AWS Secrets Manager
- Never commit secrets to source control
- Rotate signing keys periodically

## Consequences

### Positive

**Security Benefits:**
- Strong protection against CSRF attacks (JWT + CORS)
- Stateless authentication enables horizontal scaling
- Token blacklist provides revocation capability
- Multiple layers of defense (transport, validation, authorization)
- HTTPS enforcement protects data in transit
- Input validation prevents injection attacks
- File upload validation prevents malicious file execution
- Claims-based authorization is performant and flexible

**Developer Experience:**
- Clear security boundaries and patterns
- Minimal API endpoints remain simple with `.RequireAuthorization()`
- FluentValidation provides declarative validation
- Environment-specific configuration supports different deployment scenarios
- JWT debugging is straightforward (decode at jwt.io)

**Performance:**
- Stateless tokens eliminate session storage overhead
- Claims in JWT reduce database lookups
- Redis blacklist check is fast (microseconds)
- No anti-forgery token generation/validation overhead

**Future-Proofing:**
- JWT tokens support microservices architecture
- Claims extensible for fine-grained permissions
- Token-based auth works across web, mobile, IoT
- CORS configuration supports multi-domain deployments

### Negative

**Complexity:**
- JWT lifecycle management (generation, refresh, revocation)
- Distributed blacklist requires Redis infrastructure
- Token expiration requires refresh token flow
- Developers must understand JWT concepts and claims

**Token Size:**
- JWTs are larger than session IDs (200-500 bytes)
- Sent with every request in Authorization header
- More bandwidth compared to cookie-based sessions with small session IDs

**Revocation Overhead:**
- Requires blacklist check on every request
- Redis dependency for distributed systems
- Graceful degradation needed if cache unavailable

**Secret Rotation:**
- Changing JWT signing key invalidates all tokens
- Requires coordinated deployment across instances
- Grace period needed to support old and new keys simultaneously

**Anti-Forgery Disabled:**
- Must explicitly disable on endpoints with IFormFile parameters
- Developers might mistakenly think they need anti-forgery
- Documentation burden to explain why it's disabled

### Implementation Notes

**Authentication Configuration:**
File: `FireInsurance.Users.Infrastructure/Services/Identity/JwtAuthenticationInstaller.cs`
```csharp
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateLifetime = true,
            ValidateIssuer = true,
            ValidIssuer = jwtOptions.Issuer,
            ValidateAudience = true,
            ValidAudience = jwtOptions.Audience,
            ClockSkew = TimeSpan.FromSeconds(60),
            NameClaimType = "sub",
            RoleClaimType = "role",
        };
        options.MapInboundClaims = false;  // Preserve claim names
    });
```

**Endpoint Protection Pattern:**
```csharp
public void MapEndpoint(IEndpointRouteBuilder app)
{
    app.MapPost("/endpoint", HandlerAsync)
        .RequireAuthorization()  // Requires valid JWT
        .DisableAntiforgery()    // For IFormFile endpoints only
        .WithTags(Tags.SomeTag);
}
```

**Claims Access Pattern:**
```csharp
public class SomeService
{
    private readonly IClaimsProvider _claimsProvider;

    public async Task<Result> DoSomething()
    {
        var userId = _claimsProvider.UserId;  // Extract from JWT claims
        var isAdmin = _claimsProvider.IsAdmin;
        // ... business logic
    }
}
```

**Token Generation:**
File: `FireInsurance.Users.Infrastructure/Services/Identity/JwtTokenService.cs`
```csharp
var claims = new List<Claim>
{
    new("sub", userId),
    new("phone_number", phoneNumber),
    new("jti", Guid.NewGuid().ToString()),
    new("iat", DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()),
};

if (isAdmin) claims.Add(new("is_admin", "true"));
if (isSuperAdmin) claims.Add(new("is_super_admin", "true"));
```

**Token Blacklist Check:**
```csharp
var jti = claimsProvider.Jti;
var isBlacklisted = await cache.GetAsync($"blacklist:{jti}");
if (isBlacklisted is not null)
{
    return Result.Unauthorized();  // Token has been revoked
}
```

**File Upload Security:**
```csharp
// Validator checks content type and file signature
public class FileContentTypeValidator : IFileContentTypeValidator
{
    public Result<bool> Validate(IFormFile file, FileCategory category)
    {
        // Check magic numbers (file signatures)
        // Verify extension matches content
        // Validate against whitelist for category
    }
}
```

**CORS Setup:**
```csharp
const string corsName = "SAMAN_CORS_POLICY";
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsName, builder =>
    {
        builder
            .WithOrigins(allowedOrigins)  // Whitelist specific domains
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

app.UseCors(corsName);  // Apply globally
```

**Middleware Order (Critical):**
```csharp
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(corsName);
app.UseAuthentication();  // Must come before UseAuthorization
app.UseAuthorization();
// Do NOT add UseAntiforgery() - we use JWT, not cookies
app.MapEndpoints<IEndpoint>();
```

**JWT Configuration (appsettings.json):**
```json
{
  "Jwt": {
    "Issuer": "https://yourdomain.com",
    "Audience": "https://yourdomain.com",
    "SigningKey": "USE_ENVIRONMENT_VARIABLE_IN_PRODUCTION",
    "AccessTokenExpirationInMinutes": 60,
    "RefreshTokenExpirationInDays": 1
  }
}
```

**Production Checklist:**
- [ ] Move JWT signing key to environment variable or Key Vault
- [ ] Configure production CORS origins (remove localhost)
- [ ] Enable security headers middleware
- [ ] Activate file content-type validation (disable mock)
- [ ] Implement rate limiting on authentication endpoints
- [ ] Enable HSTS with appropriate max-age
- [ ] Configure proper password policy (require digits, uppercase, special chars)
- [ ] Set up monitoring for failed authentication attempts
- [ ] Implement token refresh flow in clients
- [ ] Document token lifecycle for client developers

## Alternatives Considered

**Cookie-Based Authentication**
- Rejected: Doesn't work well for mobile apps, requires CSRF protection, creates session affinity requirements
- Would require anti-forgery tokens and session storage

**OAuth2/OpenID Connect with IdentityServer**
- Considered for future: Provides standardized flows, better token management
- Rejected for now: Over-engineering for current requirements, adds infrastructure complexity
- May reconsider when adding third-party integrations or SSO

**API Keys**
- Rejected: Less secure (long-lived, no expiration), difficult to rotate, no user context

**Session-Based Authentication**
- Rejected: Doesn't scale horizontally, requires sticky sessions or distributed session storage
- Poor fit for stateless API architecture

**mTLS (Mutual TLS)**
- Considered for future: Excellent for service-to-service authentication
- Rejected for client-facing API: Certificate management burden on clients, not suitable for browsers/mobile

**Basic Authentication**
- Rejected: Credentials sent with every request, no token expiration, requires secure storage

**Keep Anti-Forgery Enabled**
- Rejected: Adds unnecessary complexity and overhead for JWT-based APIs
- CSRF protection already provided by JWT + CORS architecture
- Would require additional endpoint to distribute tokens to clients

## References

- RFC 7519: JSON Web Token (JWT) - IETF Standard
- RFC 6749: OAuth 2.0 Authorization Framework
- OWASP Top 10 - Web Application Security Risks
- OWASP API Security Top 10
- ASP.NET Core Security Documentation - Microsoft
- JWT Best Practices - Auth0
- "API Security in Action" by Neil Madden
- NIST Digital Identity Guidelines (SP 800-63B) - Authentication and Lifecycle Management
