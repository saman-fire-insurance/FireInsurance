/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddInsuranceInfoToClaimRequest } from '../models/AddInsuranceInfoToClaimRequest';
import type { CreateDamageClaimRequest } from '../models/CreateDamageClaimRequest';
import type { GridifyQuery } from '../models/GridifyQuery';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DamageClaimService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1DamageClaimAddInsurance({
        requestBody,
    }: {
        requestBody: AddInsuranceInfoToClaimRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/DamageClaim/AddInsurance',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1DamageClaimCreate({
        requestBody,
    }: {
        requestBody: CreateDamageClaimRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/DamageClaim/Create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1DamageClaimGetIncidentTypes({
        requestBody,
    }: {
        requestBody: GridifyQuery,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/DamageClaim/GetIncidentTypes',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
