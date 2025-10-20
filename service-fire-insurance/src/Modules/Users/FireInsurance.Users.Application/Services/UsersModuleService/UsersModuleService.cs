using Ardalis.Result;
using FireInsurance.Users.Contracts.Dtos;
using FireInsurance.Users.Contracts.ModuleServices;
using FireInsurance.Users.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FireInsurance.Users.Application.Services.UsersModuleService
{
    public class UsersModuleService(UserManager<User> userManager) : IUsersModuleService
    {
        private readonly UserManager<User> _userManager = userManager;

        public async Task<Result<UserDto>> GetUserById(Guid id)
        {
            var user = await _userManager.Users
                .FirstOrDefaultAsync(u => u.Id == id.ToString());

            if (user is null)
            {
                return Result<UserDto>.NotFound($"User with ID {id} not found");
            }

            var userDto = new UserDto
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                FullName = user.FullName,
                FatherName = user.FatherName,
                NationalID = user.NationalID,
                DateOfBirth = user.DateOfBirth,
                Gender = user.Gender.HasValue
                    ? user.Gender.Value
                    : null,
                CodeSentAt = user.CodeSentAt,
                CreatedAt = user.CreatedAt,
                LoggedInAt = user.LoggedInAt,
                DeletedAt = user.DeletedAt,
                IdentityConfirmed = user.IdentityConfirmed,
                Admin = user.Admin,
                SuperAdmin = user.SuperAdmin
            };

            return Result<UserDto>.Success(userDto);
        }
    }
}
