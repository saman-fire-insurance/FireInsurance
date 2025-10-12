using System.Security.Cryptography;

namespace FireInsurance.Users.Domain.Common.Utilities;

public static class CodeEncryption
{
    private static readonly byte[] Key = Convert.FromBase64String("AAECAwQFBgcICQoLDA0ODw==");
    private static readonly byte[] IV = Convert.FromBase64String("AAECAwQFBgcICQoLDA0ODw==");

    public static string Encrypt(string code)
    {
        if (string.IsNullOrEmpty(code))
        {
            return string.Empty;
        }

        using var aes = Aes.Create();
        aes.Key = Key;
        aes.IV = IV;

        var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

        using var memoryStream = new MemoryStream();
        using var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write);
        using (var streamWriter = new StreamWriter(cryptoStream))
        {
            streamWriter.Write(code);
        }

        var encryptedBytes = memoryStream.ToArray();

        return Convert.ToBase64String(encryptedBytes);
    }

    public static string Decrypt(string encryptedCode)
    {
        if (string.IsNullOrEmpty(encryptedCode))
        {
            return string.Empty;
        }

        try
        {
            var cipherBytes = Convert.FromBase64String(encryptedCode);

            using var aes = Aes.Create();
            aes.Key = Key;
            aes.IV = IV;

            var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

            using var memoryStream = new MemoryStream(cipherBytes);
            using var cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read);
            using var streamReader = new StreamReader(cryptoStream);

            return streamReader.ReadToEnd();
        }
        catch
        {
            return string.Empty;
        }
    }
}
