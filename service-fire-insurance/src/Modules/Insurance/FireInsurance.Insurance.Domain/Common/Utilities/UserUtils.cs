namespace FireInsurance.Insurance.Domain.Common.Utilities;

public sealed class UserUtils
{
    private const string AdminSuffix = "@admin";

    public static string ToDisplayFrom(string? userName)
    {
        if (string.IsNullOrWhiteSpace(userName))
        {
            return string.Empty;
        }

        return userName!.EndsWith(AdminSuffix)
            ? userName[..^AdminSuffix.Length]
            : userName;
    }

    public static string ToAppForm(string? userName)
    {
        if (string.IsNullOrWhiteSpace(userName))
        {
            return string.Empty;
        }

        return userName!.EndsWith(AdminSuffix)
            ? userName
            : userName + AdminSuffix;
    }
}
