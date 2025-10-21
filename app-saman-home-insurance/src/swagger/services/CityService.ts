/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetCitiesRequest } from '../models/GetCitiesRequest';
import type { GridifyQuery } from '../models/GridifyQuery';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CityService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1CityGetCities({
        requestBody,
    }: {
        requestBody: GetCitiesRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/City/GetCities',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1ProvinceGetProvinces({
        requestBody,
    }: {
        requestBody: GridifyQuery,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Province/GetProvinces',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
