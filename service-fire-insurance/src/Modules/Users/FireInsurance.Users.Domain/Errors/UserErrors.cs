using Ardalis.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Users.Domain.Errors
{
    public static class UserErrors
    {
        public static class Password
        {
            public static readonly string Empty = "رمز عبور اجباری است";

            public static readonly string NotSame = "رمز عبور و تکرار آن یکسان نیستند";

            public static string TooShort(int length)
            {
                return "رمز عبور حداقل باید" + length + "کاراکتر داشته باشد";
            }
        }

        public static class PhoneNumber
        {
            public static readonly string Empty = "شماره تلفن اجباری است";

            public static readonly string Invalid = "شماره تلفن اشتباه وارد شده است";
        }

        public static class Code
        {
            public static readonly string Empty = "کد اجباری است";

            public static readonly string NotSent = "مشکلی در ارسال کد پیش آمده دوباره سعی کنید";

            public static readonly string InvalidCodeError = new("کد صحیح نمی‌باشد لطفا دوباره تلاش کنید");

            public static readonly string ExpiredCodeError = new("کد منقضی شده است، لطفا کد جدید دریافت کنید");
        }

        public static class Link
        {
            public static readonly string Empty = "لینک اجباری است";

            public static readonly string CodeNotSent = "مشکلی در ارسال لینک پیش آمده دوباره سعی کنید";
        }

        public static class Email
        {
            public static readonly string Empty = "ایمیل اجباری است";

            public static readonly string Invalid = "ایمیل اشتباه وارد شده است";
        }

        public static class FirstName
        {
            public static readonly string Empty = "نام اجباری است";
        }

        public static class LastName
        {
            public static readonly string Empty = "نام خانوادگی اجباری است";
        }

        public static class NationalCode
        {
            public static readonly string Empty = "کد ملی اجباری است";

            public static readonly string Invalid = "کد ملی اشتباه وارد شده است";
        }

        public static class DateOfBirth
        {
            public static readonly string Empty = "تاریخ تولد اجباری است";

            public static readonly string Invalid = "تاریخ تولد اشتباه وارد شده است";
        }

        public static class ChaptchaToken
        {
            public static readonly string Empty = "توکن اعتبارسنجی اجباری است";
        }

        public static readonly string Empty = "کاربر اجباری است";

        public static readonly string NotRegistered = "کاربر ثبت نام نشد";

        public static readonly string LockedOut = "تعداد ورود ناموفق بیش از حد مجاز است بعد از پنج دقیقه دوباره تلاش کنید";

        public static readonly string InvalidCredentials = "نام کاربری با رمزعبور اشتباه است";

        public static readonly string NotConfirmed = "مشکلی در تائید کاربر پیش آمده است";

        public static readonly string NotAdmin = "شما دسترسی لازم را ندارید";

        public static readonly string AlreadyExists = "این نام کاربری قبلا استفاده شده است";

        public static string NotFound() => "کاربری یافت نشد";

        public static string NotFound(string phoneNumber)
        {
            if (phoneNumber.EndsWith("@admin"))
            {
                phoneNumber = phoneNumber.Replace("@admin", "");
            }

            return "کاربری با شماره تلفن " + phoneNumber + " یافت نشد";
        }

        public static string CodeSentRecently(long minutes)
        {
            if (minutes < 0)
            {
                throw new ArgumentException("Argument must be a positive value.", nameof(minutes));
            }

            return "کد اخیرا ارسال شده بعد از " + minutes + " دقیقه دوباره تلاش کنید";
        }

        public static string NotUpdated(string id)
        {
            return $"کاربر با ID = {id} ویرایش نشد";
        }

        public static string NotDeleted(string id)
        {
            return $"کابر با ID = {id} حذف نشد";
        }
    }

}
