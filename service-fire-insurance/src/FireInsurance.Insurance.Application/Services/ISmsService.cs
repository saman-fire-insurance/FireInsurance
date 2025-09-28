using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Insurance.Application.Services
{
    public interface ISmsService
    {
        Task<bool> SendCodeAsync(string phoneNumber, long code, bool isAdmin = false);

        Task<bool> SendIssuedPolicyLinkAsync(string phoneNumber, string serialNumber);

        Task<bool> SendZombiePolicyNotificationAsync(string phoneNumber, string serialNumber);

        Task<bool> SendMessageAsync(string phoneNumber, string link);
    }
}
