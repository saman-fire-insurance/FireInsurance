using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Users.Application.Services
{
    public interface IUsersCachingService
    {
        Task<bool> ValidateToken(string jti, CancellationToken cancellationToken = default);
        Task InvalidateToken(string jti, DateTimeOffset expiration, CancellationToken cancellationToken = default);
    }
}
