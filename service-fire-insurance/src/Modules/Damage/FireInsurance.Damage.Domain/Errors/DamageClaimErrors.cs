using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Damage.Domain.Errors
{
    public static class DamageClaimErrors
    {
        public static string Empty => "شناسه اعلام خسارت نمی تواند خالی باشد";
        public static string NotFound() => "درخواست خسارت مورد نظر یافت نشد";
        public static string NotFound(Guid id) => $"درخواست خسارت با شناسه {id} یافت نشد";

        public static class InsuranceError
        {
            public static string Empty => "شماره بیمه نامه نمی تواند خالی باشد";
            public static string Length(int min, int max) => $"شماره بیمه نامه باید بین {min} و {max} کاراکتر باشد";
        }
    }
}
