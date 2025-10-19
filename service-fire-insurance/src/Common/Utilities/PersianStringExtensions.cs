using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Common.Utilities
{
    public static partial class PersianStringExtensions
    {

        [GeneratedRegex(@"^(?=.*[\u0600-\u06FF\u0750-\u077Fa-zA-Z])[\u0600-\u06FF\u0750-\u077Fa-zA-Z0-9\u06F0-\u06F9\u0660-\u0669\s]+$", RegexOptions.Compiled)]
        private static partial Regex ValidPattern();

        [GeneratedRegex(@"^[\d\u06F0-\u06F9\u0660-\u0669\s]+$", RegexOptions.Compiled)]
        private static partial Regex OnlyNumbersPattern();

        [GeneratedRegex(@"^[\d\u06F0-\u06F9\u0660-\u0669\s]+$", RegexOptions.Compiled)]
        private static partial Regex MaliciousPattern();

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

        private static readonly Regex ValidRegex = ValidPattern();
        private static readonly Regex OnlyNumbersRegex = OnlyNumbersPattern();
        private static readonly Regex MaliciousRegex = MaliciousPattern();

        public static bool IsValidAlphabetical(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
                return false;

            input = input.Trim();

            return ValidRegex.IsMatch(input) &&
                !OnlyNumbersRegex.IsMatch(input) &&
                !MaliciousRegex.IsMatch(input);
        }

    }
}
