using Ardalis.Result;
using Common.Messaging;
using FireInsurance.Damage.Application.Data;
using FireInsurance.Damage.Application.Dtos;
using FireInsurance.Damage.Domain.Entities;
using FireInsurance.Damage.Domain.Enums;
using FireInsurance.Damage.Domain.Errors;
using FluentValidation;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace FireInsurance.Damage.Application.UseCases.Commands
{
    public sealed record AddIncidentInfoToClaimRequest(
        Guid DamageClaimId,
        Guid IncidentTypeId,
        DateTime OccuranceDate,
        Guid ProvinceId,
        Guid CityId,
        string Address,
        string PostalCode,
        Guid OwnershipTypeId,
        string IncidentCause,
        string? RestraintDescription = null,
        List<Guid>? IncidentImageFileIds = null,
        // Police Report
        bool HasPoliceReport = false,
        string? PoliceReportNumber = null,
        DateTime? PoliceReportDate = null,
        List<Guid>? PoliceReportFileIds = null,
        // Fire Station Report
        bool HasFireStationReport = false,
        string? FireStationName = null,
        List<Guid>? FireStationReportFileIds = null,
        // Weather Report
        bool HasWeatherReport = false,
        WeatherCondition? WeatherCondition = null,
        Probability? WeatherReportProbability = null);

    public class AddIncidentInfoToClaimCommand(AddIncidentInfoToClaimRequest request) : ICommand<DamageClaimDto>
    {
        public Guid DamageClaimId { get; set; } = request.DamageClaimId;
        public Guid IncidentTypeId { get; set; } = request.IncidentTypeId;
        public DateTime OccuranceDate { get; set; } = request.OccuranceDate;
        public Guid ProvinceId { get; set; } = request.ProvinceId;
        public Guid CityId { get; set; } = request.CityId;
        public string Address { get; set; } = request.Address;
        public string PostalCode { get; set; } = request.PostalCode;
        public Guid OwnershipTypeId { get; set; } = request.OwnershipTypeId;
        public string IncidentCause { get; set; } = request.IncidentCause;
        public string? RestraintDescription { get; set; } = request.RestraintDescription;
        public List<Guid>? IncidentImageFileIds { get; set; } = request.IncidentImageFileIds;

        // Police Report
        public bool HasPoliceReport { get; set; } = request.HasPoliceReport;
        public string? PoliceReportNumber { get; set; } = request.PoliceReportNumber;
        public DateTime? PoliceReportDate { get; set; } = request.PoliceReportDate;
        public List<Guid>? PoliceReportFileIds { get; set; } = request.PoliceReportFileIds;

        // Fire Station Report
        public bool HasFireStationReport { get; set; } = request.HasFireStationReport;
        public string? FireStationName { get; set; } = request.FireStationName;
        public List<Guid>? FireStationReportFileIds { get; set; } = request.FireStationReportFileIds;

        // Weather Report
        public bool HasWeatherReport { get; set; } = request.HasWeatherReport;
        public WeatherCondition? WeatherCondition { get; set; } = request.WeatherCondition;
        public Probability? WeatherReportProbability { get; set; } = request.WeatherReportProbability;

        internal sealed class Validator : AbstractValidator<AddIncidentInfoToClaimCommand>
        {
            public Validator()
            {
                RuleFor(req => req.DamageClaimId)
                    .NotEmpty()
                    .WithMessage(DamageClaimErrors.Empty);

                RuleFor(req => req.IncidentTypeId)
                    .NotEmpty()
                    .WithMessage("Incident type is required.");

                RuleFor(req => req.OccuranceDate)
                    .NotEmpty()
                    .WithMessage("Occurrence date is required.")
                    .LessThanOrEqualTo(DateTime.Now)
                    .WithMessage("Occurrence date cannot be in the future.");

                RuleFor(req => req.ProvinceId)
                    .NotEmpty()
                    .WithMessage("Province is required.");

                RuleFor(req => req.CityId)
                    .NotEmpty()
                    .WithMessage("City is required.");

                RuleFor(req => req.Address)
                    .NotEmpty()
                    .WithMessage("Address is required.")
                    .MaximumLength(500)
                    .WithMessage("Address must not exceed 500 characters.");

                RuleFor(req => req.PostalCode)
                    .NotEmpty()
                    .WithMessage("Postal code is required.")
                    .Length(10)
                    .WithMessage("Postal code must be 10 digits.")
                    .Matches("^[0-9]+$")
                    .WithMessage("Postal code must contain only digits.");

                RuleFor(req => req.IncidentCause)
                    .NotEmpty()
                    .WithMessage("Incident cause is required.")
                    .Length(10, 1000)
                    .WithMessage("Incident cause must be between 10 and 1000 characters.");

                RuleFor(req => req.RestraintDescription)
                    .MaximumLength(1000)
                    .WithMessage("Restraint description must not exceed 1000 characters.")
                    .When(req => !string.IsNullOrEmpty(req.RestraintDescription));

                // Police Report Validations
                RuleFor(req => req.PoliceReportNumber)
                    .NotEmpty()
                    .WithMessage("Police report number is required when HasPoliceReport is true.")
                    .When(req => req.HasPoliceReport);

                RuleFor(req => req.PoliceReportDate)
                    .NotEmpty()
                    .WithMessage("Police report date is required when HasPoliceReport is true.")
                    .LessThanOrEqualTo(DateTime.Now)
                    .WithMessage("Police report date cannot be in the future.")
                    .When(req => req.HasPoliceReport);

                // Fire Station Report Validations
                RuleFor(req => req.FireStationName)
                    .NotEmpty()
                    .WithMessage("Fire station name is required when HasFireStationReport is true.")
                    .When(req => req.HasFireStationReport);

                // Weather Report Validations
                RuleFor(req => req.WeatherCondition)
                    .NotNull()
                    .WithMessage("Weather condition is required when HasWeatherReport is true.")
                    .When(req => req.HasWeatherReport);

                RuleFor(req => req.WeatherReportProbability)
                    .NotNull()
                    .WithMessage("Weather report probability is required when HasWeatherReport is true.")
                    .When(req => req.HasWeatherReport);
            }
        }

        public class Handler(IDamageDbContext dbContext) : ICommandHandler<AddIncidentInfoToClaimCommand, DamageClaimDto>
        {
            public async Task<Result<DamageClaimDto>> Handle(AddIncidentInfoToClaimCommand request, CancellationToken cancellationToken)
            {
                // Find the damage claim
                var damageClaim = await dbContext.DamageClaims.Include(dc => dc.Incident).SingleOrDefaultAsync(c => c.Id == request.DamageClaimId, cancellationToken);
                if (damageClaim == null)
                {
                    return Result.NotFound(DamageClaimErrors.NotFound(request.DamageClaimId));
                }

                // Validate incident type exists
                var incidentType = await dbContext.IncidentTypes.SingleOrDefaultAsync(it => it.Id == request.IncidentTypeId && !it.IsDeleted, cancellationToken);
                if (incidentType == null)
                {
                    return Result.NotFound("Incident type not found.");
                }

                // Validate province exists
                var province = await dbContext.Provinces.SingleOrDefaultAsync(p => p.Id == request.ProvinceId && !p.IsDeleted, cancellationToken);
                if (province == null)
                {
                    return Result.NotFound("Province not found.");
                }

                // Validate city exists and belongs to the province
                var city = await dbContext.Cities.SingleOrDefaultAsync(c => c.Id == request.CityId && c.ProvinceId == request.ProvinceId && !c.IsDeleted, cancellationToken);
                if (city == null)
                {
                    return Result.NotFound("City not found or does not belong to the specified province.");
                }
                
                // Validate ownership type exists
                var ownershipType = await dbContext.OwnershipTypes.SingleOrDefaultAsync(c => c.Id == request.OwnershipTypeId && !c.IsDeleted, cancellationToken);
                if (ownershipType == null)
                {
                    return Result.NotFound("Ownership type not found .");
                }

                // Validate images exist
                //if (request.IncidentImageFileIds != null && request.IncidentImageFileIds.Count > 0)
                //{
                //    var incidentImageFiles = await dbContext.StoredFiles.SingleOrDefaultAsync(c => request.IncidentImageFileIds.Contains(c.id) && !c.IsDeleted, cancellationToken);
                //    if (ownershipType == null)
                //    {
                //        return Result.NotFound("Image files not found.");
                //    }
                //}

                // Create the incident
                var createIncidentResult = Incident.Create(
                    request.OccuranceDate,
                    incidentType,
                    province,
                    city,
                    request.Address,
                    request.PostalCode,
                    ownershipType,
                    request.IncidentCause,
                    request.RestraintDescription,
                    request.IncidentImageFileIds,
                    request.HasPoliceReport,
                    request.PoliceReportNumber,
                    request.PoliceReportDate,
                    request.PoliceReportFileIds,
                    request.HasFireStationReport,
                    request.FireStationName,
                    request.FireStationReportFileIds,
                    request.HasWeatherReport,
                    request.WeatherCondition,
                    request.WeatherReportProbability);
                if (!createIncidentResult.IsSuccess)
                {
                    if (createIncidentResult.IsInvalid())
                    {
                        return Result.Invalid(createIncidentResult.ValidationErrors);
                    }

                    return Result.Error(new ErrorList(createIncidentResult.Errors));
                }

                // Add incident to database
                var incident = createIncidentResult.Value;
                dbContext.Incidents.Add(incident);

                // Associate incident with damage claim
                damageClaim.IncidentId = incident.Id;
                damageClaim.Incident = incident;

                // Update damage claim status to next stage
                damageClaim.Status = DamageClaimStatus.DamagedObjectsInfo;

                await dbContext.SaveChangesAsync(cancellationToken);

                return Result.Success(damageClaim.Adapt<DamageClaimDto>());
            }
        }
    }
}
