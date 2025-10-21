import { DamageClaimService } from "@/swagger/services/DamageClaimService";
import { GridifyQuery } from "@/swagger/models/GridifyQuery";
import useSWR from "swr";

export const GET_INSURABLE_OBJECTS = "GET_INSURABLE_OBJECTS";

export const GetInsurableObjects = (requestBody?: GridifyQuery) => {
  const { data, error, isValidating, mutate, isLoading } = useSWR(
    [GET_INSURABLE_OBJECTS, requestBody].join("-"),
    () =>
      DamageClaimService.postApiV1DamageClaimGetInsurableObjects({
        requestBody: requestBody || {},
      })
  );

  return {
    insurableObjects: data,
    insurableObjectsIsLoading: isLoading || isValidating,
    insurableObjectsIsError: error,
    insurableObjectsMutate: mutate,
  };
};
