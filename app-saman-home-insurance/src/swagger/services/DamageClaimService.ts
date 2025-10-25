/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddDamagedObjectsToClaimRequest } from '../models/AddDamagedObjectsToClaimRequest';
import type { AddIncidentInfoToClaimRequest } from '../models/AddIncidentInfoToClaimRequest';
import type { AddInsuranceInfoToClaimRequest } from '../models/AddInsuranceInfoToClaimRequest';
import type { AddStakeHoldersInfoToClaimRequest } from '../models/AddStakeHoldersInfoToClaimRequest';
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
    public static postApiV1DamageClaimAddDamagedObjects({
        requestBody,
    }: {
        requestBody: AddDamagedObjectsToClaimRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/DamageClaim/AddDamagedObjects',
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
    public static postApiV1DamageClaimAddIncidentInfo({
        requestBody,
    }: {
        requestBody: AddIncidentInfoToClaimRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/DamageClaim/AddIncidentInfo',
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
    public static postApiV1DamageClaimAddStakeHolders({
        requestBody,
    }: {
        requestBody: AddStakeHoldersInfoToClaimRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/DamageClaim/AddStakeHolders',
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
    public static getApiV1DamageClaim({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/DamageClaim/{id}',
            path: {
                'id': id,
            },
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
    public static getApiV1DamageClaim1({
        page,
        pageSize,
        orderBy,
        filter,
    }: {
        page: number,
        pageSize: number,
        orderBy?: string,
        filter?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/DamageClaim',
            query: {
                'Page': page,
                'PageSize': pageSize,
                'OrderBy': orderBy,
                'Filter': filter,
            },
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
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1DamageClaimGetInsurableObjects({
        requestBody,
    }: {
        requestBody: GridifyQuery,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/DamageClaim/GetInsurableObjects',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1DamageClaimGetOwnershipTypes({
        requestBody,
    }: {
        requestBody: GridifyQuery,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/DamageClaim/GetOwnershipTypes',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
