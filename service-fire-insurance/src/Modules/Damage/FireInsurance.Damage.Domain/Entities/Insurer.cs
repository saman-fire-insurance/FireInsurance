using Ardalis.Result;
using Mapster;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace FireInsurance.Damage.Domain.Entities
{
    [Owned]
    [AdaptTo("[name]Dto"), GenerateMapper]
    public class Insurer
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string AccountNumber { get; set; } = string.Empty;
        public string NationalID { get; set; } = string.Empty;
        public DateOnly? DateOfBirth { get; set; }
        public string Iban { get; set; } = string.Empty;


        public static Result<Insurer> Create(string firstName, string lastName, string phoneNumber, string nationalID, DateOnly? dateOfBirth)
        {
            if (string.IsNullOrWhiteSpace(firstName))
            {
                return Result.Invalid(new ValidationError("نام نمی تواند خالی باشد"));
            }

            if (string.IsNullOrWhiteSpace(lastName))
            {
                return Result.Invalid(new ValidationError("نام خانوادگی نمی تواند خالی باشد"));
            }

            if (string.IsNullOrWhiteSpace(phoneNumber))
            {
                return Result.Invalid(new ValidationError("شماره تلفن نمی تواند خالی باشد"));
            }

            if (string.IsNullOrWhiteSpace(nationalID))
            {
                return Result.Invalid(new ValidationError("کد ملی نمی تواند خالی باشد"));
            }

            var createdInsurer = new Insurer
            {
                FirstName = firstName,
                LastName = lastName,
                PhoneNumber = phoneNumber,
                NationalID = nationalID,
                DateOfBirth = dateOfBirth
            };

            return Result.Success(createdInsurer);
        }

        public Result<Insurer> AddBankAccountInfo(string accountNumber, string iban)
        {
            if (string.IsNullOrWhiteSpace(accountNumber))
            {
                return Result.Invalid(new ValidationError("شماره حساب نمی تواند خالی باشد"));
            }

            if (string.IsNullOrWhiteSpace(iban))
            {
                return Result.Invalid(new ValidationError("شماره شبا نمی تواند خالی باشد"));
            }

            if (!Regex.IsMatch(iban, @"^IR[0-9]{24}$"))
            {
                return Result.Invalid(new ValidationError("فرمت شماره شبا صحیح نیست"));
            }

            AccountNumber = accountNumber;
            Iban = iban;

            return Result.Success(this);
        }
    }
}
