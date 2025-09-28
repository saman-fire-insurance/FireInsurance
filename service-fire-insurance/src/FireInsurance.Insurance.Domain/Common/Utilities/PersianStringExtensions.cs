using System.Text;

namespace FireInsurance.Insurance.Domain.Common.Utilities
{
    public static class PersianStringExtensions
    {
        private static readonly Dictionary<char, char> _map = new()
        {
            ['ي'] = 'ی',
            ['ى'] = 'ی',
            ['ئ'] = 'ی',
            ['ك'] = 'ک',
            ['ة'] = 'ه',
            ['ۀ'] = 'ه',
            ['ؤ'] = 'و',
            ['٠'] = '0',
            ['١'] = '1',
            ['٢'] = '2',
            ['٣'] = '3',
            ['٤'] = '4',
            ['٥'] = '5',
            ['٦'] = '6',
            ['٧'] = '7',
            ['٨'] = '8',
            ['٩'] = '9',
            ['،'] = ',',
            ['؛'] = ';',
            ['؟'] = '?'
        };

        public static string NormalizePersian(this string input)
        {
            if (string.IsNullOrWhiteSpace(input))
            {
                return input ?? string.Empty;
            }

            var normalized = input.Select(c => _map.TryGetValue(c, out var repl) ? repl : c).ToArray();

            return new string(normalized).Normalize(NormalizationForm.FormC);
        }
    }
}
