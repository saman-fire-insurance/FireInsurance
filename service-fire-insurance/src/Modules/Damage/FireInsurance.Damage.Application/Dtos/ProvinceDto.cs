namespace FireInsurance.Damage.Application.Dtos;

public sealed record ProvinceDto(
    Guid Id,
    string Name,
    IReadOnlyCollection<CitySummaryDto> Cities);

public sealed record ProvinceSummaryDto(
    Guid Id,
    string Name);
