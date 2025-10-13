namespace FireInsurance.Damage.Application.Dtos
{
    public class InsurableObjectDto : BaseDto
    {
        public int SamanId { get; set; }
        public string Title { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }
}
