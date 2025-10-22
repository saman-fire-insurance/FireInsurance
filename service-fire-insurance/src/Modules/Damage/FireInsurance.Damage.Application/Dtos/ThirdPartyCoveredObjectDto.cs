namespace FireInsurance.Damage.Application.Dtos
{
    public class ThirdPartyCoveredObjectDto : BaseDto
    {
        public Guid ThirdPartyCoverageId { get; set; }
        public Guid InsurableObjectId { get; set; }
        public InsurableObjectDto? InsurableObject { get; set; }
    }
}
