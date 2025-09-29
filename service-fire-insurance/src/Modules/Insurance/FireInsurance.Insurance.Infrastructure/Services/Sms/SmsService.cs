using Ardalis.Result;
using FireInsurance.Insurance.Application.Services;
using FireInsurance.Insurance.Domain.Common.Utilities;
using FireInsurance.Insurance.Infrastructure.Services.Notification;
using Microsoft.Extensions.Logging;
using System.Net;

namespace FireInsurance.Insurance.Infrastructure.Services.Sms
{
    public sealed class SmsService(
    ISmsProviderApi smsApi,
    ILogger<SmsService> logger,
    SmsProviderOptions options) : ISmsService
    {
        public async Task<Result> SendCodeAsync(string phoneNumber, string code)
        {
            var message = OtpMessage(code);
            var response = await SendMessageAsync(phoneNumber, message);

            return response;
        }

        public async Task<Result> SendIssuedPolicyLinkAsync(string phoneNumber, string serialNumber)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(phoneNumber))
                {
                    throw new Exception("[SmsService.SendZombiePolicyNotificationAsync] Phone number was null!");
                }

                var message = IssuedPolicyMessage(serialNumber);

                return await SendMessageAsync(phoneNumber, message);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to send link SMS to {PhoneNumber}", phoneNumber);

                return false;
            }
        }

        public async Task<Result> SendZombiePolicyNotificationAsync(string phoneNumber, string serialNumber)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(phoneNumber))
                {
                    throw new Exception("[SmsService.SendZombiePolicyNotificationAsync] Phone number was null!");
                }

                var message = ZombiePolicyMessage(serialNumber);

                return await SendMessageAsync(phoneNumber, message);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to send link SMS to {PhoneNumber}", phoneNumber);

                return false;
            }
        }

        public async Task<Result> SendMessageAsync(string phoneNumber, string message)
        {
            try
            {
                phoneNumber = FormatPhoneNumber(phoneNumber);

                var customerId = DateTime.Now.Ticks;

                var request = new SmsRequest
                {
                    Mobile = phoneNumber,
                    SmsBody = message,
                    CustomerId = customerId,
                };

                var response = await smsApi.SendSmsAsync(new SmsRequestWrapper
                {
                    Request = request,
                    Mobile = phoneNumber,
                    SmsBody = message
                });

                return response.Code == ((int)HttpStatusCode.OK) ?
                    Result.Success() :
                    Result.CriticalError(["خطا در ارسال کد. لطفا در صورت دریافت مجدد خطا با پشتیبانی تماس بگیرید."]);    
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to send link SMS to {PhoneNumber}", phoneNumber);

                return Result.CriticalError(["خطا در ارسال کد. لطفا در صورت دریافت مجدد خطا با پشتیبانی تماس بگیرید."]);
            }
        }

        private static string FormatPhoneNumber(string phoneNumber)
        {
            return "98" + phoneNumber[1..];
        }

        private string OtpMessage(string code)
        {
            return $"""
                                کد ورود شما:
                Code:{code}
                به بیمه سامان خوش‌آمدید.
                @{options.MessageUrl} #{code}
                """;
        }

        private static string IssuedPolicyMessage(string serialNumber)
        {

            var code = WebUtility.UrlEncode(serialNumber);
            var encryptedToken = CodeEncryption.Encrypt(code);
            var link = $"https://SomeUrl/inquiry?cd={encryptedToken}";

            return $"""
                کاربر گرامی بیمه نامه شما با موفقیت صادر شد
                               شماره سریال بیمه بیمه نامه: {serialNumber}
                                لینک بیمه نامه:
                {link}
                بیمه سامان
                """;
        }

        private static string ZombiePolicyMessage(string serialNumber)
        {

            var code = WebUtility.UrlEncode(serialNumber);
            var encryptedToken = CodeEncryption.Encrypt(code);
            var link = $"https://SomeUrl/inquiry?cd={encryptedToken}";

            return $"""
                کاربر گرامی، شما می توانید با کلیک روی لینک زیر نسبت به تکمیل بیمه نامه خود اقدام فرمایید:
                {link}
                بیمه سامان
                """;
        }
    }
}
