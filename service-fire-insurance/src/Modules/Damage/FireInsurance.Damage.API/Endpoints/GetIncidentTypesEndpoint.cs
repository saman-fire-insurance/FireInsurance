using Common.Abstraction.MinimalApi;
using Common.Extensions;
using FireInsurance.Damage.Application.UseCases.Commands;
using FireInsurance.Damage.Application.UseCases.Queries;
using Gridify;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Damage.API.Endpoints
{
    internal sealed class GetIncidentTypesEndpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/DamageClaim/GetIncidentTypes", CreateDamageClaimAsync)
                //.RequireAuthorization()
                .WithTags(Tags.DamageClaim);
        }

        public static async Task<IResult> CreateDamageClaimAsync(GridifyQuery request, ISender sender, CancellationToken cancellationToken)
        {
            var query = new GetIncidentTypesQuery(request);
            var result = await sender.Send(query, cancellationToken);

            return result.ToActionResult();
        }
    }
}
