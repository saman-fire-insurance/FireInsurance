using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Users.Application.Dtos.SamanService
{
    public class PersonInquiryRequest
    {
        public string NationalCode { set; get; } = string.Empty;
        public string BirthDate { set; get; } = string.Empty;
    }
}
