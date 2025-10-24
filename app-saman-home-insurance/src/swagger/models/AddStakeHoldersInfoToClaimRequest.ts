/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StakeHolderItemRequest } from './StakeHolderItemRequest';
export type AddStakeHoldersInfoToClaimRequest = {
    damageClaimId?: string;
    accountNumber?: string | null;
    iban?: string | null;
    hasOtherStakeHolder?: boolean;
    otherStakeHolders?: Array<StakeHolderItemRequest> | null;
    hasNeighborStakeHolder?: boolean;
    neighborStakeHolders?: Array<StakeHolderItemRequest> | null;
};

