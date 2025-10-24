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
        public string Iban { get; set; } = string.Empty;

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
