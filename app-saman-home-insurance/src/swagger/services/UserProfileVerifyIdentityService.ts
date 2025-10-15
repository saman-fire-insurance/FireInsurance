/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PersonInquiryRequest } from '../models/PersonInquiryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserProfileVerifyIdentityService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1UsersVerifyIdentity({
        requestBody,
    }: {
        requestBody: PersonInquiryRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Users/VerifyIdentity',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
}
