import { DamageClaimService } from "@/swagger/services/DamageClaimService";
import { GridifyQuery } from "@/swagger/models/GridifyQuery";
import useSWR from "swr";

export const GET_REVIEW = "GET_REVIEW";

export const GetDamageClaim = (id: string) => {
  const { data, error, isValidating, mutate, isLoading } = useSWR(
    [GET_REVIEW, id].join("-"),
    () =>
      DamageClaimService.getApiV1DamageClaim({
        id,
      })
  );

  return {
    reviewData: data,
    reviewDataIsLoading: isLoading || isValidating,
    reviewDataIsError: error,
    reviewDataMutate: mutate,
  };
};
