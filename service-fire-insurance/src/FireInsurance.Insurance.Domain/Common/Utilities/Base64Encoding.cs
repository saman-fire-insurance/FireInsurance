using System.Text;

namespace FireInsurance.Insurance.Domain.Common.Utilities;

public static class Base64Encoding
{
    public static string Encode(string text)
    {
        var textBytes = Encoding.UTF8.GetBytes(text);

        return Convert.ToBase64String(textBytes);
    }

    public static string Decode(string encodedData)
    {
        var base64EncodedBytes = Convert.FromBase64String(encodedData);

        return Encoding.UTF8.GetString(base64EncodedBytes);
    }
}
