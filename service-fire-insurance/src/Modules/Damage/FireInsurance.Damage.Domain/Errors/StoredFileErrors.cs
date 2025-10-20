using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Damage.Domain.Errors
{
    public static class StoredFileErrors
    {
        public static class Name
        {
            public static readonly string Empty = "نام فایل اجباری است";
        }

        public static readonly string Empty = "فایل اجباری است";

        public static readonly string NotSupportedContentType = "فرمت فایل اشتباه است";

        public static readonly string MaximumSizeExceeded = "حجم فایل بیش از اندازه است";

        public static readonly string NotCreated = "فایل ساخته نشد";

        public static readonly string NotFound = "فایل یافت نشد";

        public static string NotUpdated(Guid id)
        {
            return $"فایل با ID = {id} ویرایش نشد";
        }

        public static string NotRemoved(Guid id)
        {
            return $"فایل با ID = {id} حذف نشد";
        }

        public static string SameName(string name)
        {
            return $"فایلی با نام = {name} وجود دارد";
        }
    }
}
