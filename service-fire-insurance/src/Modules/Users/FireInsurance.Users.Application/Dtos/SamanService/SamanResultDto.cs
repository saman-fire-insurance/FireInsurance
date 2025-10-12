using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Users.Application.Dtos.SamanService
{
    public class SamanResultDto<T>
    {
        public required SamanOutputDto<T> Output { get; set; }
    }

    public class SamanOutputDto<T>
    {
        public SamanStatusCode Code { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Result { get; set; } = default;
    }

    public enum SamanStatusCode
    {
        /// <summary>
        /// عملیات با موفقیت انجام شد - Operation completed successfully
        /// </summary>
        Success = 200,

        /// <summary>
        /// وب سرویس به خطا مواجه شد - Web service encountered an error
        /// </summary>
        WebServiceError = -100,

        /// <summary>
        /// ورودی نامعتبر است - Input is invalid
        /// </summary>
        InvalidInput = -1,

        /// <summary>
        /// نام کاربری یا گذرواژه صحیح نمی باشد - Username or password is incorrect
        /// </summary>
        InvalidCredentials = -2,

        /// <summary>
        /// توکن وارد شده صحیح نمی باشد - Entered token is incorrect
        /// </summary>
        InvalidToken = -3,

        /// <summary>
        /// در خواست با شکست مواجه شد - Request failed
        /// </summary>
        RequestFailed = -4,

        /// <summary>
        /// هیچ موردی با این اطلاعات یافت نشد - No item found with this information
        /// </summary>
        NotFound = -5,

        /// <summary>
        /// عدم دسترسی به وب سرویس با IP - No access to web service with IP
        /// </summary>
        IpAccessDenied = -7
    }


    public static class SamanResultDtoExtensions
    {
        /// <summary>
        /// Check if the API response indicates success
        /// </summary>
        public static bool IsSuccess<T>(this SamanResultDto<T> response)
        {
            return response.Output.Code == SamanStatusCode.Success;
        }

        /// <summary>
        /// Get the result or default if not successful
        /// </summary>
        public static T? GetResultOrDefault<T>(this SamanResultDto<T> response)
        {
            return response.IsSuccess() ? response.Output.Result : default;
        }

        /// <summary>
        /// Create a successful response
        /// </summary>
        public static SamanResultDto<T> CreateSuccess<T>(T result, string message = "عملیات با موفقیت انجام شد")
        {
            return new SamanResultDto<T>
            {
                Output = new SamanOutputDto<T>
                {
                    Code = SamanStatusCode.Success,
                    Message = message,
                    Result = result
                }
            };
        }

        /// <summary>
        /// Create an error response using the enum
        /// </summary>
        public static SamanResultDto<T> CreateError<T>(SamanStatusCode errorCode, string? customMessage = null)
        {
            var message = customMessage ?? GetDefaultErrorMessage(errorCode);

            return new SamanResultDto<T>
            {
                Output = new SamanOutputDto<T>
                {
                    Code = errorCode,
                    Message = message,
                    Result = default
                }
            };
        }

        private static string GetDefaultErrorMessage(SamanStatusCode StatusCode)
        {
            return StatusCode switch
            {
                SamanStatusCode.InvalidInput => "ورودی نامعتبر است",
                SamanStatusCode.InvalidCredentials => "نام کاربری یا گذرواژه صحیح نمی باشد",
                SamanStatusCode.InvalidToken => "توکن وارد شده صحیح نمی باشد",
                SamanStatusCode.RequestFailed => "در خواست با شکست مواجه شد",
                SamanStatusCode.NotFound => "هیچ موردی با این اطلاعات یافت نشد",
                SamanStatusCode.IpAccessDenied => "عدم دسترسی به وب سرویس با IP",
                SamanStatusCode.WebServiceError => "وب سرویس به خطا مواجه شد",
                _ => "خطای نامشخص"
            };
        }
    }
}
