using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Damage.Infrastructure.Services.Saman.Dtos
{
    public class SamanInsurableObjectDto
    {
        public int Id { get; set; }
        public string Caption { get; set; } = string.Empty;
        public int IsActive { get; set; }
    }
}
