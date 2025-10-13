using Ardalis.Result;
using Common.Interfaces;
using Common.Messaging;
using FireInsurance.Users.Application.Dtos.SamanService;
using FireInsurance.Users.Application.Services;
using FireInsurance.Users.Domain.Common.Enums;
using FireInsurance.Users.Domain.Entities;
using FireInsurance.Users.Domain.Errors;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Users.Application.UseCases.Commands
{
    public record PersonInquiryRequest(string NationalCode, string DateOfBirth);

    public sealed class VerifyPersonalIdentityCommand(PersonInquiryRequest request) : ICommand<PersonInquiryResponse>
    {
        public string NationalCode { get; set; } = request.NationalCode;
        public string DateOfBirth { get; set; } = request.DateOfBirth;

        internal sealed class Validator : AbstractValidator<VerifyPersonalIdentityCommand>
        {
            public Validator()
            {
                RuleFor(req => req.NationalCode)
                    .NotEmpty()
                    .WithMessage(UserErrors.NationalCode.Empty)
                    .Length(10)
                    .WithMessage(UserErrors.NationalCode.Invalid)
                    .Matches("^[0-9]+$")
                    .WithMessage(UserErrors.NationalCode.Invalid);

                RuleFor(req => req.DateOfBirth)
                    .NotEmpty()
                    .WithMessage(UserErrors.DateOfBirth.Empty)
                    .Length(10)
                    .WithMessage(UserErrors.DateOfBirth.Invalid)
                    .Matches(@"^\d{4}/\d{2}/\d{2}$")
                    .WithMessage(UserErrors.DateOfBirth.Invalid);
            }
        }

        internal sealed class Handler(
            IPersonInquiryService personInquiryService,
            IClaimsProvider claimsProvider,
            UserManager<User> userManager) : ICommandHandler<VerifyPersonalIdentityCommand, PersonInquiryResponse>
        {
            public async Task<Result<PersonInquiryResponse>> Handle(VerifyPersonalIdentityCommand request, CancellationToken cancellationToken)
            {
                var userId = claimsProvider.UserId;
                if (string.IsNullOrEmpty(userId))
                {
                    return Result.Unauthorized(UserErrors.NotLoggedIn);
                }

                var user = await userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return Result.Unauthorized(UserErrors.NotLoggedIn);
                }

                var inquiryResult = await personInquiryService.GetPersonInfoAsync(request.NationalCode, request.DateOfBirth);
                if (!inquiryResult.IsSuccess)
                {
                    return inquiryResult;
                }

                var personInfo = inquiryResult.Value;
                user.ApplyInquiryResult(personInfo.FirstName, personInfo.LastName, personInfo.NationalCode!, personInfo.FatherName, personInfo.Gender ? Gender.Male : Gender.Female);

                return Result.Success(inquiryResult.Value);
            }
        }
    }
}
