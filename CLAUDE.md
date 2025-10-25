# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FireInsurance is a full-stack insurance management application consisting of:
- **Backend**: .NET 9 modular monolith API (`service-fire-insurance`)
- **Frontend**: Next.js 15 application with TypeScript (`app-saman-home-insurance`)
- **Infrastructure**: Docker Compose setup with PostgreSQL database

## Common Commands

### Frontend (app-saman-home-insurance)

```bash
# Development
cd app-saman-home-insurance
pnpm install                    # Install dependencies
pnpm dev                        # Start dev server with Turbopack (http://localhost:3000)
pnpm build                      # Build for production
pnpm start                      # Start production server
pnpm lint                       # Run ESLint

# Generate API client from Swagger
pnpm generate-swagger           # Generate TypeScript API client from swagger.json
```

### Backend (service-fire-insurance)

```bash
# Build and run
dotnet build FireInsurance.sln                    # Build entire solution
dotnet run --project service-fire-insurance/src/Gateway/Gateway.csproj  # Run API Gateway (http://localhost:5000)

# Database migrations (from module directory)
cd service-fire-insurance/src/Modules/Users/FireInsurance.Users.Infrastructure
dotnet ef migrations add <MigrationName> --startup-project ../../Gateway/Gateway.csproj
dotnet ef database update --startup-project ../../Gateway/Gateway.csproj

# Similar pattern for other modules (Insurance, Damage)
cd service-fire-insurance/src/Modules/<Module>/FireInsurance.<Module>.Infrastructure
dotnet ef migrations add <MigrationName> --startup-project ../../Gateway/Gateway.csproj
```

### Docker

```bash
# Start infrastructure services
cd infra
docker-compose up -d            # Start PostgreSQL database
docker-compose down             # Stop services

# Database connection:
# Host: localhost
# Port: 5432
# Database: fire-insurance
# Username: postgres
# Password: Faraz@123
```

## Architecture

### Backend: Modular Monolith (.NET 9)

The backend follows a **Vertical Slice/Modular Monolith** architecture with these modules:

#### Modules
- **Users**: User authentication, OTP verification, identity management
- **Insurance**: Insurance policy management
- **Damage**: Damage declaration and claims processing
- **Payment**: Payment processing (placeholder structure exists)

Each module follows **Clean Architecture** with layers:
```
FireInsurance.<Module>.API/          # HTTP endpoints, module installer
FireInsurance.<Module>.Application/  # Use cases, CQRS handlers
FireInsurance.<Module>.Domain/       # Domain entities, value objects
FireInsurance.<Module>.Infrastructure/ # Data access, EF Core DbContext
FireInsurance.<Module>.Contracts/    # DTOs for inter-module communication (Users module only)
```

#### Common Layer
Located at `service-fire-insurance/src/Common/`:
- **Abstraction**: Base classes, interfaces for minimal APIs, service installers
- **Behaviors**: MediatR pipeline behaviors (validation, logging)
- **Data**: Base repository implementations, EF Core configurations
- **Extensions**: Extension methods for DI, configuration
- **Installers**: Service registration helpers
- **Messaging**: Event bus, integration events infrastructure
- **Pagination**: Gridify-based pagination utilities

#### Gateway
The `Gateway` project is the API entry point:
- Registers all modules via `InstallModules()` pattern
- Configures MediatR for all module assemblies
- Sets up JWT authentication, CORS, OpenAPI/Swagger
- Uses minimal APIs defined in each module's API layer
- Connection string and settings in `appsettings.json`

#### Key Patterns
- **CQRS**: Commands/queries handled via MediatR
- **Result Pattern**: Uses Ardalis.Result for error handling
- **FluentValidation**: Request validation in pipeline behaviors
- **Mapster**: Object mapping
- **Gridify**: Query filtering and pagination
- **Repository Pattern**: Base repository in Common layer
- **Module Installer**: Each module has a `ModuleInstaller` class that registers its services

### Frontend: Next.js 15 App Router

#### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (login) - route group
│   ├── (landing)/         # Public landing pages - route group
│   ├── (panel)/           # Protected panel routes - route group
│   │   └── damageDeclaration/  # Multi-step damage declaration wizard
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components (shadcn/ui based)
├── hooks/                 # Custom React hooks
├── lib/                   # Core utilities
│   ├── auth.ts           # NextAuth configuration with OTP provider
│   ├── api-error-handler.ts  # Centralized API error handling
│   ├── jalali-utils.ts   # Persian calendar utilities
│   └── openapi-config.ts # OpenAPI client configuration
├── middleware.ts          # Auth middleware (route protection)
├── swagger/              # Auto-generated API client (from openapi-typescript-codegen)
├── swr/                  # SWR hooks for data fetching
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
```

#### Authentication
- **NextAuth.js** with custom OTP provider
- Session-based authentication with JWT
- Middleware protects routes based on authentication status
- Public routes: `/`, `/aboutHomeInsurance`, `/aboutUs`, `/contact`
- Auth routes: `/login` (redirects to `/damageDeclaration` if authenticated)
- Protected routes: `/damageDeclaration` and all other non-public routes

#### Data Fetching
- **SWR** for client-side data fetching and caching
- Auto-generated API client in `src/swagger/` from backend Swagger spec
- API client configured in `lib/openapi-config.ts` with base URL and auth headers

#### UI Framework
- **Radix UI** primitives with **shadcn/ui** components
- **Tailwind CSS** for styling (with `tailwindcss-animate`, Flowbite icons)
- **Framer Motion** for animations
- **React Hook Form** + **Zod** for form handling and validation
- **date-fns**, **dayjs**, **jalaliday** for date manipulation (Persian calendar support)

#### State Management
- **Zustand** for global state management
- **SWR** for server state

## Development Workflow

### Adding a New Feature to Backend Module

1. Define domain entities in `<Module>.Domain/`
2. Create command/query in `<Module>.Application/`
3. Implement handler in `<Module>.Application/`
4. Add endpoint in `<Module>.API/` using minimal API pattern
5. Register endpoint in module installer if needed
6. Create/update EF Core migration if database changes required

### Adding a New Frontend Page

1. Create page in appropriate route group under `src/app/`
2. Add route to middleware configuration if protection needed
3. Create/use SWR hooks in `src/swr/` for data fetching
4. Use shadcn/ui components from `src/components/`
5. Handle form validation with react-hook-form + Zod

### Regenerating API Client

When backend API changes:
1. Ensure backend is running and Swagger endpoint is accessible
2. Export swagger.json from the API
3. Run: `cd app-saman-home-insurance && pnpm generate-swagger`
4. Auto-generated client updates in `src/swagger/`

## Configuration

### Backend Configuration
- Main config: `service-fire-insurance/src/Gateway/appsettings.json`
- Contains: Database connection, JWT settings, CORS, external service URLs (SMS, Saman services)
- Secrets managed via HashiCorp Vault (see `.github/workflows/vault-test.yml`)

### Frontend Configuration
- Environment variables for API URL (configured in `lib/openapi-config.ts`)
- NextAuth configuration in `lib/auth.ts`

## Database

- **PostgreSQL 14** (via Docker)
- Separate DbContext per module
- EF Core with snake_case naming convention (via `EFCore.NamingConventions`)
- Migrations per module in `<Module>.Infrastructure`

## External Integrations

- **Google reCAPTCHA v3** (frontend & backend validation)
- **SMS Provider** (Zobdeh) for OTP delivery
- **Saman Services** for insurance-related integrations
- **HashiCorp Vault** for secrets management (OIDC JWT auth from GitHub Actions)

## Deployment

### Kubernetes with Kustomize

The project uses Kustomize for Kubernetes deployments with three environments:

**Environments:**
- **Stage** (`fireinsurance-stage`): Auto-deploys on push to `main`/`master`
- **Production** (`fireinsurance-prod`): Deploys on release or manual trigger
- **Preview** (`fireinsurance-pr-<number>`): Ephemeral environments for each PR

**Key Files:**
```
infra/k8s/
├── base/           # Base Kubernetes manifests (backend, frontend)
├── overlays/       # Environment-specific configs (stage, prod, preview)
└── README.md       # Detailed deployment documentation
```

**GitHub Actions Workflows:**
- `build-and-push.yml`: Builds and pushes Docker images to registry
- `deploy-stage.yml`: Deploys to staging environment
- `deploy-prod.yml`: Deploys to production environment
- `deploy-pr-preview.yml`: Creates preview environments for PRs
- `cleanup-pr-preview.yml`: Cleans up PR preview environments

**Quick Commands:**
```bash
# Deploy to stage manually
cd infra/k8s/overlays/stage
kustomize build . | kubectl apply -f -

# Check deployment status
kubectl get all -n fireinsurance-stage

# View logs
kubectl logs -f deployment/backend -n fireinsurance-stage
```

**Setup:** See [infra/k8s/SETUP.md](infra/k8s/SETUP.md) for complete deployment setup instructions.
