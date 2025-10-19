using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Damage.Application.Dtos
{
    public class IncidentTypeDto : BaseDto
    {
        public string Title { get; set; } = string.Empty;
    }
}
