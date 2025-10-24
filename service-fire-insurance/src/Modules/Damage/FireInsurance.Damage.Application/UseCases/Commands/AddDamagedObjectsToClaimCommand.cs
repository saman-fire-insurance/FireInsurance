using Ardalis.Result;
using Common.Messaging;
using FireInsurance.Damage.Application.Data;
using FireInsurance.Damage.Application.Dtos;
using FireInsurance.Damage.Domain.Entities;
using FireInsurance.Damage.Domain.Errors;
using FluentValidation;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace FireInsurance.Damage.Application.UseCases.Commands
{
    public sealed record DamagedObjectItemRequest(Guid InsurableObjectId, decimal EstimatedLoss, string? Description = null);
    public sealed record AddDamagedObjectsToClaimRequest(Guid DamageClaimId, List<DamagedObjectItemRequest> DamagedObjects);

    public class AddDamagedObjectsToClaimCommand(AddDamagedObjectsToClaimRequest request) : ICommand<DamageClaimDto>
    {
        public Guid DamageClaimId { get; set; } = request.DamageClaimId;
        public List<DamagedObjectItemRequest> DamagedObjects { get; set; } = request.DamagedObjects;

        internal sealed class Validator : AbstractValidator<AddDamagedObjectsToClaimCommand>
        {
            public Validator()
            {
                RuleFor(req => req.DamageClaimId)
                    .NotEmpty()
                    .WithMessage(DamageClaimErrors.Empty);

                RuleFor(req => req.DamagedObjects)
                    .NotEmpty()
                    .WithMessage("Damaged objects list cannot be empty.");

                RuleForEach(req => req.DamagedObjects).ChildRules(item =>
                {
                    item.RuleFor(x => x.InsurableObjectId)
                        .NotEmpty()
                        .WithMessage("InsurableObjectId is required.");

                    item.RuleFor(x => x.EstimatedLoss)
                        .GreaterThan(0)
                        .WithMessage("EstimatedLoss must be greater than 0.");
                });
            }
        }

        public class Handler(IDamageDbContext dbContext) : ICommandHandler<AddDamagedObjectsToClaimCommand, DamageClaimDto>
        {
            public async Task<Result<DamageClaimDto>> Handle(AddDamagedObjectsToClaimCommand request, CancellationToken cancellationToken)
            {
                // Find the damage claim
                var damageClaim = await dbContext.DamageClaims
                    .Include(dc => dc.DamagedObjects)
                    .SingleOrDefaultAsync(c => c.Id == request.DamageClaimId, cancellationToken);

                if (damageClaim == null)
                {
                    return Result.NotFound(DamageClaimErrors.NotFound(request.DamageClaimId));
                }

                // Get all InsurableObjectIds from the request
                var insurableObjectIds = request.DamagedObjects.Select(d => d.InsurableObjectId).ToList();

                // Fetch all InsurableObjects at once
                var insurableObjects = await dbContext.InsurableObjects
                    .Where(io => insurableObjectIds.Contains(io.Id))
                    .ToDictionaryAsync(io => io.Id, cancellationToken);

                // Validate all InsurableObjects exist
                var missingIds = insurableObjectIds.Except(insurableObjects.Keys).ToList();
                if (missingIds.Count != 0)
                {
                    return Result.Error($"InsurableObject(s) with ID(s) {string.Join(", ", missingIds)} not found.");
                }

                // Create DamagedObject entities using factory method
                var damagedObjects = new List<DamagedObject>();
                foreach (var item in request.DamagedObjects)
                {
                    var insurableObject = insurableObjects[item.InsurableObjectId];

                    var damagedObjectResult = DamagedObject.Create(
                        damageClaimId: request.DamageClaimId,
                        insurableObject: insurableObject,
                        estimatedLoss: item.EstimatedLoss,
                        description: item.Description
                    );

                    if (!damagedObjectResult.IsSuccess)
                    {
                        if (damagedObjectResult.IsInvalid())
                        {
                            return Result.Invalid(damagedObjectResult.ValidationErrors);
                        }

                        return Result.Error(new ErrorList(damagedObjectResult.Errors));
                    }

                    damagedObjects.Add(damagedObjectResult.Value);
                }

                dbContext.DamagedObjects.AddRange(damagedObjects);

                // Add damaged objects to the claim using the domain method
                var result = damageClaim.AddDamagedObjects(damagedObjects);
                if (!result.IsSuccess)
                {
                    if (result.IsInvalid())
                    {
                        return Result.Invalid(result.ValidationErrors);
                    }

                    return Result.Error(new ErrorList(result.Errors));
                }

                // Save changes
                await dbContext.SaveChangesAsync(cancellationToken);

                return Result.Success();
            }
        }
    }
}
