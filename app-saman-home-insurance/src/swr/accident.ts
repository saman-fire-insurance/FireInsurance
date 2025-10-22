import { DamageClaimService } from "@/swagger/services/DamageClaimService";
import { GridifyQuery } from "@/swagger/models/GridifyQuery";
import useSWR from "swr";
import { CityService } from "@/swagger/services/CityService";
import { GetCitiesRequest } from "@/swagger/models/GetCitiesRequest";

export const GET_INCIDENT_TYPES = "GET_INCIDENT_TYPES";
export const GET_CITIES = "GET_CITIES";
export const GET_PROVINCES = "GET_PROVINCES";
export const GET_OWNERSHIP = "GET_OWNERSHIP";

export const GetAccidentType = (requestBody?: GridifyQuery) => {
  const { data, error, isValidating, mutate, isLoading } = useSWR(
    [GET_INCIDENT_TYPES, requestBody].join("-"),
    () =>
      DamageClaimService.postApiV1DamageClaimGetIncidentTypes({
        requestBody: requestBody || {},
      })
  );

  return {
    accidentType: data,
    accidentTypeIsLoading: isLoading || isValidating,
    accidentTypeIsError: error,
    accidentTypeMutate: mutate,
  };
};

export const GetCities = (requestBody?: GetCitiesRequest) => {
  const shouldFetch =
    requestBody?.provinceId != null && requestBody.provinceId !== "";

  const { data, error, isValidating, mutate, isLoading } = useSWR(
    shouldFetch ? [GET_CITIES, requestBody].join("-") : null,
    () =>
      CityService.postApiV1CityGetCities({
        requestBody: requestBody || {},
      })
  );

  return {
    cities: data,
    citiesIsLoading: isLoading || isValidating,
    citiesIsError: error,
    citiesMutate: mutate,
  };
};

export const GetProvinces = (requestBody?: GridifyQuery) => {
  const { data, error, isValidating, mutate, isLoading } = useSWR(
    [GET_PROVINCES, requestBody].join("-"),
    () =>
      CityService.postApiV1ProvinceGetProvinces({
        requestBody: requestBody || {},
      })
  );

  return {
    provinces: data,
    provincesIsLoading: isLoading || isValidating,
    provincesIsError: error,
    provincesMutate: mutate,
  };
};

export const GetOwnerships = (requestBody?: GridifyQuery) => {
  const { data, error, isValidating, mutate, isLoading } = useSWR(
    [GET_OWNERSHIP, requestBody].join("-"),
    () =>
      DamageClaimService.postApiV1DamageClaimGetOwnershipTypes({
        requestBody: requestBody || {},
      })
  );

  return {
    ownership: data,
    ownershipIsLoading: isLoading || isValidating,
    ownershipIsError: error,
    ownershipMutate: mutate,
  };
};
