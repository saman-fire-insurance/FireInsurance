/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OtpDto } from '../models/OtpDto';
import type { OtpRequestDto } from '../models/OtpRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserAuthenticationOtpService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1UsersRequestOtp({
        requestBody,
    }: {
        requestBody: OtpRequestDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Users/RequestOtp',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1UsersVerifyOtp({
        requestBody,
    }: {
        requestBody: OtpDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Users/VerifyOtp',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
