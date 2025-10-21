using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireInsurance.Damage.Domain.Errors
{

    public static class ProvinceErrors
    {
        public static class Name
        {
            public static readonly string Empty = "نام استان اجباری است";
        }

        public static readonly string Empty = "استان اجباری است";

        public static readonly string NotRemovable = "استانی که دارای شهر باشد قابل حذف شدن نیست";

        public static readonly string NotCreated = "استان حذف نشد";

        public static string NotFound(Guid id)
        {
            return $"استان با ID = {id} پیدا نشد";
        }

        public static string NotUpdated(Guid id)
        {
            return $"استان با ID = {id} ویرایش نشد";
        }

        public static string NotRemoved(Guid id)
        {
            return $"استان با ID = {id} حذف نشد";
        }

        public static string SameName(string name)
        {
            return $"استانی با نام = {name} وجود دارد";
        }
    }

}
