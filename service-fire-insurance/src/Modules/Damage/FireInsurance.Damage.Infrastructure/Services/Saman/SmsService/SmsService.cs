using FireInsurance.Damage.Application.Services.SamanServices.SmsService;
using FireInsurance.Damage.Domain.Common.Utilities;
using Microsoft.Extensions.Logging;
using Refit;
using System.Net;
using System.Text.Json;

namespace FireInsurance.Damage.Infrastructure.Services.Saman.SmsService;

public sealed class SmsService(
    ISmsProviderApi smsApi,
    IStageSmsProviderApi stageSmsApi,
    ILogger<SmsService> logger,
    SmsProviderOptions options) : ISmsService
{
    public async Task<bool> SendSubmittedClaimConfirmationAsync(string phoneNumber, string serialNumber)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(phoneNumber))
            {
                throw new Exception("[SmsService.SendZombiePolicyNotificationAsync] Phone number was null!");
            }

            var message = SubmittedClaimMessage(serialNumber);

            return await SendMessageAsync(phoneNumber, message);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to send link SMS to {PhoneNumber}", phoneNumber);

            return false;
        }
    }

    public async Task<bool> SendMessageAsync(string phoneNumber, string message)
    {
        try
        {
            var isOnStage = options.Username == "ParaTechTest";
            logger.LogInformation($"[SmsService] Environment: {(isOnStage ? "Stage" : "Production")}");

            phoneNumber = FormatPhoneNumber(phoneNumber);

            var customerId = DateTime.Now.Ticks;

            var request = new SmsRequest
            {
                Mobile = phoneNumber,
                SmsBody = message,
                CustomerId = customerId,
            };

            SmsResponse response;
            if (isOnStage)
            {
                var stageResponse = await stageSmsApi.SendSmsAsync(message, phoneNumber, customerId.ToString());
                response = new SmsResponse
                {
                    Result = new SmsResult
                    {
                        RegisterDate = DateTime.UtcNow,
                        ServerId = stageResponse.Response.Data.FirstOrDefault()?.ServerId ?? 0
                    },
                    Code = stageResponse.Response.Code,
                    Message = stageResponse.Response.Message
                };
            }
            else
            {
                response = await smsApi.SendSmsAsync(new SmsRequestWrapper
                {
                    Request = request,
                    Mobile = phoneNumber,
                    SmsBody = message
                });
            }

            var content = JsonSerializer.Serialize(response);
            logger.LogInformation(content);

            return response.Code == 200;
        }
        catch (ApiException ex)
        {
            logger.LogError(ex, "API exception occured when trying to send SMS to {PhoneNumber}", phoneNumber);

            return false;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to send SMS to {PhoneNumber}", phoneNumber);

            return false;
        }
    }

    private static string FormatPhoneNumber(string phoneNumber)
    {
        return "98" + phoneNumber[1..];
    }
    
    private string SubmittedClaimMessage(string serialNumber)
    {
        var isOnStage = options.Username == "ParaTechTest";
        logger.LogInformation($"[SmsService] Environment: {(isOnStage ? "Stage" : "Production")}");

        var url = isOnStage ? options.StageMessageUrl : options.MessageUrl;
        var code = WebUtility.UrlEncode(serialNumber);
        var encryptedToken = CodeEncryption.Encrypt(code);
        var link = $"{url}/inquiry?cd={encryptedToken}";

        return $"""
                کاربر گرامی بیمه نامه شما با موفقیت صادر شد
                               شماره سریال بیمه نامه: {serialNumber}
                                لینک بیمه نامه:
                {link}
                درصورت عدم بارگذاری صحیح تصاویر و ویدیوی مورد نیاز یا نقص در مدارک ارسال شده، بیمه نامه صادره فاقد اعتبار خواهد بود.
                بیمه سامان
                """;
    }

    //public async Task<bool> SendCodeAsync(string phoneNumber, long code, bool isAdmin = false)
    //{
    //    try
    //    {
    //        var message = OtpMessage(code);
    //        var response = await SendMessageAsync(phoneNumber, message);

    //        return response;
    //    }
    //    catch (Exception ex)
    //    {
    //        logger.LogError(ex, "Failed to send code SMS to {PhoneNumber}", phoneNumber);

    //        return false;
    //    }
    //}

    //public async Task<bool> SendZombiePolicyNotificationAsync(string phoneNumber, Guid id)
    //{
    //    try
    //    {
    //        if (string.IsNullOrWhiteSpace(phoneNumber))
    //        {
    //            throw new Exception("[SmsService.SendZombiePolicyNotificationAsync] Phone number was null!");
    //        }

    //        var message = ZombiePolicyMessage(id);

    //        return await SendMessageAsync(phoneNumber, message);
    //    }
    //    catch (Exception ex)
    //    {
    //        logger.LogError(ex, "Failed to send link SMS to {PhoneNumber}", phoneNumber);

    //        return false;
    //    }
    //}

    //private string OtpMessage(long code)
    //{
    //    var isOnStage = options.Username == "ParaTechTest";
    //    logger.LogInformation($"[SmsService] Environment: {(isOnStage ? "Stage" : "Production")}");

    //    var url = isOnStage ? options.StageMessageUrl : options.MessageUrl;

    //    return $"""
    //                            کد ورود شما:
    //            Code:{code}
    //            به بیمه سامان خوش‌آمدید.
    //            @{url} #{code}
    //            """;
    //}

    //private string ZombiePolicyMessage(Guid id)
    //{
    //    var isOnStage = options.Username == "ParaTechTest";
    //    logger.LogInformation($"[SmsService] Environment: {(isOnStage ? "Stage" : "Production")}");

    //    var url = isOnStage ? options.StageMessageUrl : options.MessageUrl;
    //    //var code = WebUtility.UrlEncode(id.ToString());
    //    //var encryptedToken = CodeEncryption.Encrypt(code);
    //    var link = $"{url}/submitNewPet/{id}";

    //    return $"""
    //            کاربر گرامی، شما می توانید با کلیک روی لینک زیر نسبت به تکمیل بیمه نامه خود اقدام فرمایید:
    //            {link}
    //            بیمه سامان
    //            """;
    //}
}
