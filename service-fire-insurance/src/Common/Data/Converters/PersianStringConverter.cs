using Common.Utilities;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Common.Data.Converters
{
    public class PersianStringConverter : ValueConverter<string, string>
    {
        public PersianStringConverter() : base(
            v => v.NormalizePersian(),
            v => v.NormalizePersian(),
            new ConverterMappingHints(size: 1000))
        {
        }
    }
}
