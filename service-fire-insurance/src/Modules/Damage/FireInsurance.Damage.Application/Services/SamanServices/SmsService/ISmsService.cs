using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Damage.Application.Services.SamanServices.SmsService
{
    public interface ISmsService
    {
        //Task<bool> SendCodeAsync(string phoneNumber, long code, bool isAdmin = false);

        //Task<bool> SendZombiePolicyNotificationAsync(string phoneNumber, Guid id);

        Task<bool> SendSubmittedClaimConfirmationAsync(string phoneNumber, string serialNumber);

        Task<bool> SendMessageAsync(string phoneNumber, string message);
    }
}
