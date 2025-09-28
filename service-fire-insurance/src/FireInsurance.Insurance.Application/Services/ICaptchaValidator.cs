using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Insurance.Application.Services
{
    public interface ICaptchaValidator
    {
        Task<bool> ValidateTokenAsync(string token, string? action = null);
    }
}
