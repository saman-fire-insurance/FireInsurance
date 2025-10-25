using Ardalis.Result;
using Common.Messaging;
using FireInsurance.Damage.Application.Data;
using FireInsurance.Damage.Domain.Errors;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Damage.Application.UseCases.Commands
{
    public class SubmitDamageClaimCommand(Guid damageClaimId) : ICommand
    {
        public Guid DamageClaimId { get; set; } = damageClaimId;

        internal sealed class Validator : AbstractValidator<SubmitDamageClaimCommand>
        {
            public Validator()
            {
                RuleFor(req => req.DamageClaimId)
                    .NotEmpty()
                    .WithMessage(DamageClaimErrors.Empty);
            }
        }

        public class Handler(IDamageDbContext dbContext, ILogger<SubmitDamageClaimCommand> logger) : ICommandHandler<SubmitDamageClaimCommand>
        {
            public async Task<Result> Handle(SubmitDamageClaimCommand request, CancellationToken cancellationToken)
            {
                var damageClaim = await dbContext.DamageClaims.SingleOrDefaultAsync(dc => dc.Id == request.DamageClaimId, cancellationToken);
                if (damageClaim == null)
                {
                    return Result.NotFound(DamageClaimErrors.NotFound());
                }

                var submitResult = damageClaim.Submit();
                if (!submitResult.IsSuccess)
                {
                    return submitResult;
                }

                try
                {
                    await dbContext.SaveChangesAsync(cancellationToken);
                }
                catch(Exception ex)
                {
                    logger.LogError(ex, "Error while submitting damage claim with id {DamageClaimId}", request.DamageClaimId);
                    return Result.Error(DamageClaimErrors.Unexpected);
                }

                return Result.Success();
            }
        }
    }
}
