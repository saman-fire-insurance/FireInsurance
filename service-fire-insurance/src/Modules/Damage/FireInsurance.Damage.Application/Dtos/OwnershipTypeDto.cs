namespace FireInsurance.Damage.Application.Dtos
{
    public class OwnershipTypeDto : BaseDto
    {
        public string Title { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }
}
