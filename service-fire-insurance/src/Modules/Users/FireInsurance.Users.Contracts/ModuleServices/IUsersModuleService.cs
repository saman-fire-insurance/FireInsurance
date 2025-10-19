using Ardalis.Result;
using FireInsurance.Users.Contracts.Dtos;

namespace FireInsurance.Users.Contracts.ModuleServices
{
    public interface IUsersModuleService
    {
        Task<Result<UserDto>> GetUserById(Guid id);
    }
}
