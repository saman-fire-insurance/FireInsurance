// import {
//   PersonInquiryRequest,
//   UserProfileVerifyIdentityService,
// } from "@/swagger";
// import useSWR from "swr";
// export const GET_USER_IDENTITY = "GET_USER_IDENTITY ";

// export const GetUserIdentity = (requestBody: PersonInquiryRequest) => {
//   const { data, error, isValidating, mutate, isLoading } = useSWR(
//     [GET_USER_IDENTITY, requestBody].join("-"),
//     () =>
//       UserProfileVerifyIdentityService.postApiV1UsersVerifyIdentity({
//         requestBody,
//       })
//   );
//   return {
//     dataUserIdentity: data,
//     dataUserIdentityIsLoading: isLoading || isValidating,
//     dataUserIdentityIsError: error,
//     dataUserIdentityMutate: mutate,
//   };
// };
