# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER root
WORKDIR /app


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["service-fire-insurance/src/Gateway/Gateway.csproj", "service-fire-insurance/src/Gateway/"]
COPY ["service-fire-insurance/src/Modules/Insurance/FireInsurance.Insurance.API/FireInsurance.Insurance.API.csproj", "service-fire-insurance/src/Modules/Insurance/FireInsurance.Insurance.API/"]
COPY ["service-fire-insurance/src/Common/Common.csproj", "service-fire-insurance/src/Common/"]
COPY ["service-fire-insurance/src/Modules/Users/FireInsurance.Users.API/FireInsurance.Users.API.csproj", "service-fire-insurance/src/Modules/Users/FireInsurance.Users.API/"]
COPY ["service-fire-insurance/src/Modules/Damage/FireInsurance.Damage.Infrastructure/FireInsurance.Damage.Infrastructure.csproj", "service-fire-insurance/src/Modules/Damage/FireInsurance.Damage.Infrastructure/"]
COPY ["service-fire-insurance/src/Modules/Damage/FireInsurance.Damage.Domain/FireInsurance.Damage.Domain.csproj", "service-fire-insurance/src/Modules/Damage/FireInsurance.Damage.Domain/"]
COPY ["service-fire-insurance/src/Modules/Damage/FireInsurance.Damage.Application/FireInsurance.Damage.Application.csproj", "service-fire-insurance/src/Modules/Damage/FireInsurance.Damage.Application/"]
COPY ["service-fire-insurance/src/Modules/Users/FireInsurance.Users.Contracts/FireInsurance.Users.Contracts.csproj", "service-fire-insurance/src/Modules/Users/FireInsurance.Users.Contracts/"]
COPY ["service-fire-insurance/src/Modules/Users/FireInsurance.Users.Application/FireInsurance.Users.Application.csproj", "service-fire-insurance/src/Modules/Users/FireInsurance.Users.Application/"]
COPY ["service-fire-insurance/src/Modules/Users/FireInsurance.Users.Domain/FireInsurance.Users.Domain.csproj", "service-fire-insurance/src/Modules/Users/FireInsurance.Users.Domain/"]
COPY ["service-fire-insurance/src/Modules/Users/FireInsurance.Users.Infrastructure/FireInsurance.Users.Infrastructure.csproj", "service-fire-insurance/src/Modules/Users/FireInsurance.Users.Infrastructure/"]
COPY ["service-fire-insurance/src/Modules/Damage/FireInsurance.Damage.API/FireInsurance.Damage.API.csproj", "service-fire-insurance/src/Modules/Damage/FireInsurance.Damage.API/"]
RUN dotnet restore "./service-fire-insurance/src/Gateway/Gateway.csproj"
COPY . .
WORKDIR "/src/service-fire-insurance/src/Gateway"
RUN dotnet build "./Gateway.csproj" -c Release -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Gateway.csproj" -c Release -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENV ASPNETCORE_URLS=http://+:80

ENTRYPOINT ["dotnet", "Gateway.dll"]