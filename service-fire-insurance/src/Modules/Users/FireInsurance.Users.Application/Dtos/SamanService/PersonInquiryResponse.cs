using System.Text.Json.Serialization;

namespace FireInsurance.Users.Application.Dtos.SamanService
{
    public class PersonInquiryResponse
    {
        /// <summary>
        /// آدرس - Address
        /// </summary>
        [JsonPropertyName("Address")]
        public string? Address { get; set; }

        /// <summary>
        /// آدرس ایمیل کاربر - Buyer Email
        /// </summary>
        [JsonPropertyName("BuyerEmail")]
        public string BuyerEmail { get; set; } = string.Empty;

        /// <summary>
        /// شهر - City information
        /// </summary>
        [JsonPropertyName("City")]
        public LocationInfo City { get; set; } = new();

        /// <summary>
        /// نام پدر - Father Name
        /// </summary>
        [JsonPropertyName("FatherName")]
        public string FatherName { get; set; } = string.Empty;

        /// <summary>
        /// نام - First Name
        /// </summary>
        [JsonPropertyName("FirstName")]
        public string FirstName { get; set; } = string.Empty;

        /// <summary>
        /// جنسیت - Gender (True: مرد/Male, False: زن/Female)
        /// </summary>
        [JsonPropertyName("Gender")]
        public bool Gender { get; set; }

        /// <summary>
        /// شماره شناسنامه - Identity Number
        /// </summary>
        [JsonPropertyName("IdentityNo")]
        public string IdentityNo { get; set; } = string.Empty;

        /// <summary>
        /// محل صدور - Issue Place
        /// </summary>
        [JsonPropertyName("IssuePlace")]
        public string IssuePlace { get; set; } = string.Empty;

        /// <summary>
        /// نام خانوادگی - Last Name
        /// </summary>
        [JsonPropertyName("LastName")]
        public string LastName { get; set; } = string.Empty;

        /// <summary>
        /// کد پستی - Postal Code
        /// </summary>
        [JsonPropertyName("PostalCode")]
        public string PostalCode { get; set; } = string.Empty;

        /// <summary>
        /// استان - State information
        /// </summary>
        [JsonPropertyName("State")]
        public LocationInfo State { get; set; } = new();

        public string? NationalCode { get; set; }
        public string? DateOfBirth { get; set; }
    }
    /// <summary>
    /// Location information (State/City) with Code, Id, and Name
    /// </summary>
    public class LocationInfo
    {
        /// <summary>
        /// Location code
        /// </summary>
        [JsonPropertyName("Code")]
        public string Code { get; set; } = string.Empty;

        /// <summary>
        /// Location ID
        /// </summary>
        [JsonPropertyName("Id")]
        public int Id { get; set; }

        /// <summary>
        /// Location name in Persian
        /// </summary>
        [JsonPropertyName("Name")]
        public string Name { get; set; } = string.Empty;
    }
}