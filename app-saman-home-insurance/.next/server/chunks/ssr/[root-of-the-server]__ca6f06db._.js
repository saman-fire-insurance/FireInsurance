module.exports = [
"[project]/src/swagger/core/OpenAPI.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* generated using openapi-typescript-codegen -- do not edit */ /* istanbul ignore file */ /* tslint:disable */ /* eslint-disable */ __turbopack_context__.s([
    "OpenAPI",
    ()=>OpenAPI
]);
const OpenAPI = {
    BASE: process.env.NEXT_PUBLIC_API_URL || 'https://app-44bee534ec-saman-prod.apps.ir-central1.arvancaas.ir',
    VERSION: '1',
    WITH_CREDENTIALS: false,
    CREDENTIALS: 'include',
    TOKEN: undefined,
    USERNAME: undefined,
    PASSWORD: undefined,
    HEADERS: undefined,
    ENCODE_PATH: undefined
};
}),
"[project]/src/swagger/core/ApiError.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* generated using openapi-typescript-codegen -- do not edit */ /* istanbul ignore file */ /* tslint:disable */ /* eslint-disable */ __turbopack_context__.s([
    "ApiError",
    ()=>ApiError
]);
class ApiError extends Error {
    url;
    status;
    statusText;
    body;
    request;
    constructor(request, response, message){
        super(message);
        this.name = 'ApiError';
        this.url = response.url;
        this.status = response.status;
        this.statusText = response.statusText;
        this.body = response.body;
        this.request = request;
    }
}
}),
"[project]/src/swagger/core/CancelablePromise.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// @ts-nocheck
/* generated using openapi-typescript-codegen -- do not edit */ /* istanbul ignore file */ /* tslint:disable */ /* eslint-disable */ __turbopack_context__.s([
    "CancelError",
    ()=>CancelError,
    "CancelablePromise",
    ()=>CancelablePromise
]);
class CancelError extends Error {
    constructor(message){
        super(message);
        this.name = 'CancelError';
    }
    get isCancelled() {
        return true;
    }
}
class CancelablePromise {
    #isResolved;
    #isRejected;
    #isCancelled;
    #cancelHandlers;
    #promise;
    #resolve;
    #reject;
    constructor(executor){
        this.#isResolved = false;
        this.#isRejected = false;
        this.#isCancelled = false;
        this.#cancelHandlers = [];
        this.#promise = new Promise((resolve, reject)=>{
            this.#resolve = resolve;
            this.#reject = reject;
            const onResolve = (value)=>{
                if (this.#isResolved || this.#isRejected || this.#isCancelled) {
                    return;
                }
                this.#isResolved = true;
                if (this.#resolve) this.#resolve(value);
            };
            const onReject = (reason)=>{
                if (this.#isResolved || this.#isRejected || this.#isCancelled) {
                    return;
                }
                this.#isRejected = true;
                if (this.#reject) this.#reject(reason);
            };
            const onCancel = (cancelHandler)=>{
                if (this.#isResolved || this.#isRejected || this.#isCancelled) {
                    return;
                }
                this.#cancelHandlers.push(cancelHandler);
            };
            Object.defineProperty(onCancel, 'isResolved', {
                get: ()=>this.#isResolved
            });
            Object.defineProperty(onCancel, 'isRejected', {
                get: ()=>this.#isRejected
            });
            Object.defineProperty(onCancel, 'isCancelled', {
                get: ()=>this.#isCancelled
            });
            return executor(onResolve, onReject, onCancel);
        });
    }
    get [Symbol.toStringTag]() {
        return "Cancellable Promise";
    }
    then(onFulfilled, onRejected) {
        return this.#promise.then(onFulfilled, onRejected);
    }
    catch(onRejected) {
        return this.#promise.catch(onRejected);
    }
    finally(onFinally) {
        return this.#promise.finally(onFinally);
    }
    cancel() {
        if (this.#isResolved || this.#isRejected || this.#isCancelled) {
            return;
        }
        this.#isCancelled = true;
        if (this.#cancelHandlers.length) {
            try {
                for (const cancelHandler of this.#cancelHandlers){
                    cancelHandler();
                }
            } catch (error) {
                console.warn('Cancellation threw an error', error);
                return;
            }
        }
        this.#cancelHandlers.length = 0;
        if (this.#reject) this.#reject(new CancelError('Request aborted'));
    }
    get isCancelled() {
        return this.#isCancelled;
    }
}
}),
"[project]/src/swagger/core/request.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* generated using openapi-typescript-codegen -- do not edit */ /* istanbul ignore file */ /* tslint:disable */ /* eslint-disable */ __turbopack_context__.s([
    "base64",
    ()=>base64,
    "catchErrorCodes",
    ()=>catchErrorCodes,
    "getFormData",
    ()=>getFormData,
    "getHeaders",
    ()=>getHeaders,
    "getQueryString",
    ()=>getQueryString,
    "getRequestBody",
    ()=>getRequestBody,
    "getResponseBody",
    ()=>getResponseBody,
    "getResponseHeader",
    ()=>getResponseHeader,
    "isBlob",
    ()=>isBlob,
    "isDefined",
    ()=>isDefined,
    "isFormData",
    ()=>isFormData,
    "isString",
    ()=>isString,
    "isStringWithValue",
    ()=>isStringWithValue,
    "request",
    ()=>request,
    "resolve",
    ()=>resolve,
    "sendRequest",
    ()=>sendRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$ApiError$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/swagger/core/ApiError.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$CancelablePromise$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/swagger/core/CancelablePromise.ts [app-rsc] (ecmascript)");
;
;
const isDefined = (value)=>{
    return value !== undefined && value !== null;
};
const isString = (value)=>{
    return typeof value === 'string';
};
const isStringWithValue = (value)=>{
    return isString(value) && value !== '';
};
const isBlob = (value)=>{
    return typeof value === 'object' && typeof value.type === 'string' && typeof value.stream === 'function' && typeof value.arrayBuffer === 'function' && typeof value.constructor === 'function' && typeof value.constructor.name === 'string' && /^(Blob|File)$/.test(value.constructor.name) && /^(Blob|File)$/.test(value[Symbol.toStringTag]);
};
const isFormData = (value)=>{
    return value instanceof FormData;
};
const base64 = (str)=>{
    try {
        return btoa(str);
    } catch (err) {
        // @ts-ignore
        return Buffer.from(str).toString('base64');
    }
};
const getQueryString = (params)=>{
    const qs = [];
    const append = (key, value)=>{
        qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    };
    const process = (key, value)=>{
        if (isDefined(value)) {
            if (Array.isArray(value)) {
                value.forEach((v)=>{
                    process(key, v);
                });
            } else if (typeof value === 'object') {
                Object.entries(value).forEach(([k, v])=>{
                    process(`${key}[${k}]`, v);
                });
            } else {
                append(key, value);
            }
        }
    };
    Object.entries(params).forEach(([key, value])=>{
        process(key, value);
    });
    if (qs.length > 0) {
        return `?${qs.join('&')}`;
    }
    return '';
};
const getUrl = (config, options)=>{
    const encoder = config.ENCODE_PATH || encodeURI;
    const path = options.url.replace('{api-version}', config.VERSION).replace(/{(.*?)}/g, (substring, group)=>{
        if (options.path?.hasOwnProperty(group)) {
            return encoder(String(options.path[group]));
        }
        return substring;
    });
    const url = `${config.BASE}${path}`;
    if (options.query) {
        return `${url}${getQueryString(options.query)}`;
    }
    return url;
};
const getFormData = (options)=>{
    if (options.formData) {
        const formData = new FormData();
        const process = (key, value)=>{
            if (isString(value) || isBlob(value)) {
                formData.append(key, value);
            } else {
                formData.append(key, JSON.stringify(value));
            }
        };
        Object.entries(options.formData).filter(([_, value])=>isDefined(value)).forEach(([key, value])=>{
            if (Array.isArray(value)) {
                value.forEach((v)=>process(key, v));
            } else {
                process(key, value);
            }
        });
        return formData;
    }
    return undefined;
};
const resolve = async (options, resolver)=>{
    if (typeof resolver === 'function') {
        return resolver(options);
    }
    return resolver;
};
const getHeaders = async (config, options)=>{
    const [token, username, password, additionalHeaders] = await Promise.all([
        resolve(options, config.TOKEN),
        resolve(options, config.USERNAME),
        resolve(options, config.PASSWORD),
        resolve(options, config.HEADERS)
    ]);
    const headers = Object.entries({
        Accept: 'application/json',
        ...additionalHeaders,
        ...options.headers
    }).filter(([_, value])=>isDefined(value)).reduce((headers, [key, value])=>({
            ...headers,
            [key]: String(value)
        }), {});
    if (isStringWithValue(token)) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    if (isStringWithValue(username) && isStringWithValue(password)) {
        const credentials = base64(`${username}:${password}`);
        headers['Authorization'] = `Basic ${credentials}`;
    }
    if (options.body !== undefined) {
        if (options.mediaType) {
            headers['Content-Type'] = options.mediaType;
        } else if (isBlob(options.body)) {
            headers['Content-Type'] = options.body.type || 'application/octet-stream';
        } else if (isString(options.body)) {
            headers['Content-Type'] = 'text/plain';
        } else if (!isFormData(options.body)) {
            headers['Content-Type'] = 'application/json';
        }
    }
    return new Headers(headers);
};
const getRequestBody = (options)=>{
    if (options.body !== undefined) {
        if (options.mediaType?.includes('/json')) {
            return JSON.stringify(options.body);
        } else if (isString(options.body) || isBlob(options.body) || isFormData(options.body)) {
            return options.body;
        } else {
            return JSON.stringify(options.body);
        }
    }
    return undefined;
};
const sendRequest = async (config, options, url, body, formData, headers, onCancel)=>{
    const controller = new AbortController();
    const request = {
        headers,
        body: body ?? formData,
        method: options.method,
        signal: controller.signal
    };
    if (config.WITH_CREDENTIALS) {
        request.credentials = config.CREDENTIALS;
    }
    onCancel(()=>controller.abort());
    return await fetch(url, request);
};
const getResponseHeader = (response, responseHeader)=>{
    if (responseHeader) {
        const content = response.headers.get(responseHeader);
        if (isString(content)) {
            return content;
        }
    }
    return undefined;
};
const getResponseBody = async (response)=>{
    if (response.status !== 204) {
        try {
            const contentType = response.headers.get('Content-Type');
            if (contentType) {
                const jsonTypes = [
                    'application/json',
                    'application/problem+json'
                ];
                const isJSON = jsonTypes.some((type)=>contentType.toLowerCase().startsWith(type));
                if (isJSON) {
                    return await response.json();
                } else {
                    return await response.text();
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    return undefined;
};
const catchErrorCodes = (options, result)=>{
    const errors = {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        500: 'Internal Server Error',
        502: 'Bad Gateway',
        503: 'Service Unavailable',
        ...options.errors
    };
    const error = errors[result.status];
    if (error) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$ApiError$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ApiError"](options, result, error);
    }
    if (!result.ok) {
        const errorStatus = result.status ?? 'unknown';
        const errorStatusText = result.statusText ?? 'unknown';
        const errorBody = (()=>{
            try {
                return JSON.stringify(result.body, null, 2);
            } catch (e) {
                return undefined;
            }
        })();
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$ApiError$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ApiError"](options, result, `Generic Error: status: ${errorStatus}; status text: ${errorStatusText}; body: ${errorBody}`);
    }
};
const request = (config, options)=>{
    return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$CancelablePromise$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CancelablePromise"](async (resolve, reject, onCancel)=>{
        try {
            const url = getUrl(config, options);
            const formData = getFormData(options);
            const body = getRequestBody(options);
            const headers = await getHeaders(config, options);
            if (!onCancel.isCancelled) {
                const response = await sendRequest(config, options, url, body, formData, headers, onCancel);
                const responseBody = await getResponseBody(response);
                const responseHeader = getResponseHeader(response, options.responseHeader);
                const result = {
                    url,
                    ok: response.ok,
                    status: response.status,
                    statusText: response.statusText,
                    body: responseHeader ?? responseBody
                };
                catchErrorCodes(options, result);
                resolve(result.body);
            }
        } catch (error) {
            reject(error);
        }
    });
};
}),
"[project]/src/swagger/services/UserAuthenticationOtpService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* generated using openapi-typescript-codegen -- do not edit */ /* istanbul ignore file */ /* tslint:disable */ /* eslint-disable */ __turbopack_context__.s([
    "UserAuthenticationOtpService",
    ()=>UserAuthenticationOtpService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$OpenAPI$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/swagger/core/OpenAPI.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$request$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/swagger/core/request.ts [app-rsc] (ecmascript)");
;
;
class UserAuthenticationOtpService {
    /**
     * @returns any OK
     * @throws ApiError
     */ static postApiV1UsersRequestOtp({ requestBody }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$request$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["request"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$OpenAPI$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OpenAPI"], {
            method: 'POST',
            url: '/api/v1/Users/RequestOtp',
            body: requestBody,
            mediaType: 'application/json'
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */ static postApiV1UsersVerifyOtp({ requestBody }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$request$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["request"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$OpenAPI$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OpenAPI"], {
            method: 'POST',
            url: '/api/v1/Users/VerifyOtp',
            body: requestBody,
            mediaType: 'application/json'
        });
    }
}
}),
"[project]/src/swagger/services/UserProfileVerifyIdentityService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* generated using openapi-typescript-codegen -- do not edit */ /* istanbul ignore file */ /* tslint:disable */ /* eslint-disable */ __turbopack_context__.s([
    "UserProfileVerifyIdentityService",
    ()=>UserProfileVerifyIdentityService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$OpenAPI$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/swagger/core/OpenAPI.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$request$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/swagger/core/request.ts [app-rsc] (ecmascript)");
;
;
class UserProfileVerifyIdentityService {
    /**
     * @returns any OK
     * @throws ApiError
     */ static postApiV1UsersVerifyIdentity({ requestBody }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$request$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["request"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$OpenAPI$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OpenAPI"], {
            method: 'POST',
            url: '/api/v1/Users/VerifyIdentity',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`
            }
        });
    }
}
}),
"[project]/src/utils/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearAuthTokens",
    ()=>clearAuthTokens,
    "getAuthToken",
    ()=>getAuthToken,
    "getRefreshToken",
    ()=>getRefreshToken,
    "isAuthenticated",
    ()=>isAuthenticated,
    "refreshAuthToken",
    ()=>refreshAuthToken,
    "setAuthTokens",
    ()=>setAuthTokens
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$services$2f$UserProfileVerifyIdentityService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/swagger/services/UserProfileVerifyIdentityService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
const setAuthTokens = async (accessToken, refreshToken)=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set('authToken', accessToken, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        sameSite: 'strict',
        path: '/'
    });
    cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        sameSite: 'strict',
        path: '/'
    });
};
const getAuthToken = async ()=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return cookieStore.get('authToken')?.value;
};
const getRefreshToken = async ()=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return cookieStore.get('refreshToken')?.value;
};
const clearAuthTokens = async ()=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete('authToken');
    cookieStore.delete('refreshToken');
};
const refreshAuthToken = async ()=>{
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$services$2f$UserProfileVerifyIdentityService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserProfileVerifyIdentityService"].postApiV1UsersVerifyIdentity({
            requestBody: {
                refreshToken
            }
        });
        if (response.accessToken && response.refreshToken) {
            await setAuthTokens(response.accessToken, response.refreshToken);
            return response.accessToken;
        }
        throw new Error('Invalid token response');
    } catch (error) {
        await clearAuthTokens();
        throw error;
    }
};
const isAuthenticated = async ()=>{
    return !!await getAuthToken();
};
}),
"[project]/src/lib/api-error-handler.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Comprehensive API error handler utility
 * Handles various error structures including arrays, Ardalis Result patterns, and different API response formats
 */ // Helper function to safely get error message from various structures
__turbopack_context__.s([
    "cleanErrorMessage",
    ()=>cleanErrorMessage,
    "handleApiError",
    ()=>handleApiError,
    "handleApiErrorWithCleanup",
    ()=>handleApiErrorWithCleanup,
    "handleApiErrorWithDetails",
    ()=>handleApiErrorWithDetails
]);
const extractErrorMessage = (obj)=>{
    if (!obj) return null;
    // Check if obj is an array, process each item
    if (Array.isArray(obj)) {
        const errorMessages = [];
        for (const item of obj){
            if (item && typeof item === 'object') {
                // Check for errorMessage property (our target)
                if (typeof item.errorMessage === 'string' && item.errorMessage.trim()) {
                    errorMessages.push(item.errorMessage);
                } else if (typeof item.detail === 'string' && item.detail.trim()) {
                    errorMessages.push(item.detail);
                } else if (typeof item.message === 'string' && item.message.trim()) {
                    errorMessages.push(item.message);
                }
            }
        }
        if (errorMessages.length > 0) {
            return errorMessages.join('\n');
        }
    }
    // Normalize common casing differences (FastEndpoints often uses capital keys)
    const errorsKey = obj.errors ?? obj.Errors;
    const messageKey = obj.message ?? obj.Message;
    const detailKey = obj.detail ?? obj.Detail;
    const titleKey = obj.title ?? obj.Title;
    const statusKey = obj.status ?? obj.Status ?? obj.statusCode ?? obj.StatusCode;
    // Check for Ardalis/FastEndpoints Result pattern - errors array (objects or strings)
    if (errorsKey && Array.isArray(errorsKey)) {
        const errorMessages = [];
        for (const error of errorsKey){
            if (error && typeof error === 'object') {
                // Check for errorMessage property (our target)
                if (typeof error.errorMessage === 'string' && error.errorMessage.trim()) {
                    errorMessages.push(error.errorMessage);
                } else if (typeof error.detail === 'string' && error.detail.trim()) {
                    errorMessages.push(error.detail);
                } else if (typeof error.message === 'string' && error.message.trim()) {
                    errorMessages.push(error.message);
                } else if (typeof error.value === 'string' && error.value.trim()) {
                    errorMessages.push(error.value);
                } else if (typeof (error.description ?? error.Description) === 'string') {
                    errorMessages.push(String(error.description ?? error.Description));
                }
            } else if (typeof error === 'string' && error.trim()) {
                // Ardalis sometimes returns array of strings
                errorMessages.push(error);
            }
        }
        if (errorMessages.length > 0) {
            return errorMessages.join('\n');
        }
    }
    // Check for Ardalis Result pattern - isSuccess = false with single error
    if (obj.isSuccess === false) {
        // Check for single error object
        if (obj.error && typeof obj.error === 'object') {
            const errorMsg = extractErrorMessage(obj.error);
            if (errorMsg) return errorMsg;
        }
        // Check for error message directly
        if (typeof obj.errorMessage === 'string' && obj.errorMessage.trim()) {
            return obj.errorMessage;
        }
        // Check for value property (common in failed Ardalis Results)
        if (typeof obj.value === 'string' && obj.value.trim()) {
            return obj.value;
        }
    }
    // Check for errorMessage property (our target)
    if (typeof obj.errorMessage === 'string' && obj.errorMessage.trim()) {
        return obj.errorMessage;
    }
    // Check for validation errors object (lower/upper-case keys)
    if (errorsKey && typeof errorsKey === 'object' && !Array.isArray(errorsKey)) {
        const validationErrors = Object.values(errorsKey).flat().join("\n");
        if (validationErrors.trim()) {
            return `خطاهای اعتبارسنجی:\n${validationErrors}`;
        }
    }
    // ProblemDetails style
    if (typeof detailKey === 'string' && detailKey.trim()) {
        return detailKey;
    }
    // Message style
    if (typeof messageKey === 'string' && messageKey.trim()) {
        return messageKey;
    }
    // Combine title + status
    if (titleKey && statusKey) {
        return `${titleKey} (${statusKey})`;
    }
    return null;
};
const handleApiError = (error, defaultMessage = "خطایی رخ داد. لطفا دوباره تلاش کنید.")=>{
    console.log("Handling API error:", error);
    // Preserve specific error codes like 429 (Too Many Requests)
    if (error?.status === 429) {
        return "درخواست‌های زیادی ارسال شده است. لطفا کمی صبر کنید و دوباره تلاش کنید.";
    }
    // 1. Check ApiError body (swagger-generated errors)
    if (error?.body) {
        const message = extractErrorMessage(error.body);
        if (message) {
            console.log("Found error in error.body:", message);
            return message;
        }
    }
    // 2. Check if error itself has the properties
    const directMessage = extractErrorMessage(error);
    if (directMessage) {
        console.log("Found error in error object:", directMessage);
        return directMessage;
    }
    // 3. Check response.body structure
    if (error?.response?.body) {
        const message = extractErrorMessage(error.response.body);
        if (message) {
            console.log("Found error in error.response.body:", message);
            return message;
        }
    }
    // 4. Check if body is a string and try to parse it
    if (typeof error?.body === 'string') {
        try {
            const parsed = JSON.parse(error.body);
            const message = extractErrorMessage(parsed);
            if (message) {
                console.log("Found error in parsed body:", message);
                return message;
            }
        } catch (e) {
            console.log("Failed to parse error body as JSON");
        }
    }
    // 5. Check if response.body is a string and try to parse it
    if (typeof error?.response?.body === 'string') {
        try {
            const parsed = JSON.parse(error.response.body);
            const message = extractErrorMessage(parsed);
            if (message) {
                console.log("Found error in parsed response.body:", message);
                return message;
            }
        } catch (e) {
            console.log("Failed to parse response.body as JSON");
        }
    }
    // 6. Fallback to error.message if it's not generic
    if (error?.message && error.message !== 'Bad Request' && error.message !== 'Network Error' && error.message !== 'Unauthorized' && error.message !== 'Forbidden' && error.message.trim()) {
        console.log("Using error.message as fallback:", error.message);
        return error.message;
    }
    // 7. Last resort - return default message
    console.log("No meaningful error message found, using default");
    return defaultMessage;
};
const cleanErrorMessage = (errorMessage)=>{
    return errorMessage.replace("Next error(s) occurred:*", "").replace("Next error(s) occurred:", "").trim();
};
const handleApiErrorWithCleanup = (error, defaultMessage = "خطایی رخ داد. لطفا دوباره تلاش کنید.")=>{
    const message = handleApiError(error, defaultMessage);
    return cleanErrorMessage(message);
};
const handleApiErrorWithDetails = (error, defaultMessage = "خطایی رخ داد. لطفا دوباره تلاش کنید.")=>{
    const message = handleApiErrorWithCleanup(error, defaultMessage);
    return {
        message,
        status: error?.status || error?.response?.status || null,
        code: error?.code || error?.response?.code || null,
        type: error?.body?.type || error?.response?.body?.type || null,
        title: error?.body?.title || error?.response?.body?.title || null,
        detail: error?.body?.detail || error?.response?.body?.detail || null,
        body: error?.body || error?.response?.body || null
    };
};
}),
"[project]/src/app/actions/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4075ac5d6c663f8da0e777b782a227a562850e9713":"checkRegistration","40e942b44d821644d8e483022613ff3d4407131d2f":"resendCode","60d7d312321c14caeee5da8b68be183845c991f0b1":"loginWithCode","700f36a9f9a410bd8d03991d81da2fbb06210d091d":"confirmPhoneNumber"},"",""] */ __turbopack_context__.s([
    "checkRegistration",
    ()=>checkRegistration,
    "confirmPhoneNumber",
    ()=>confirmPhoneNumber,
    "loginWithCode",
    ()=>loginWithCode,
    "resendCode",
    ()=>resendCode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$services$2f$UserAuthenticationOtpService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/swagger/services/UserAuthenticationOtpService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-error-handler.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function checkRegistration(phoneNumber) {
    try {
        const requestBody = {
            phoneNumber
        };
        // if (recaptchaToken) {
        //   requestBody.captchaToken = recaptchaToken;
        // }
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$services$2f$UserAuthenticationOtpService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserAuthenticationOtpService"].postApiV1UsersRequestOtp({
            requestBody
        });
        // API returns true if the user can register (i.e., phone number is available)
        // and false if the user already exists
        return {
            success: true,
            isRegistered: result === true
        };
    } catch (error) {
        console.error("Registration check error:", error);
        const errorDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleApiErrorWithDetails"])(error, "خطا در بررسی وضعیت کاربر. لطفا دوباره تلاش کنید.");
        return {
            success: false,
            error: errorDetails.message,
            status: errorDetails.status,
            details: errorDetails.body
        };
    }
}
async function confirmPhoneNumber(phoneNumber, code, recaptchaToken) {
    // Maximum retry attempts
    const maxRetries = 1;
    let retryCount = 0;
    let lastError = null;
    // Retry logic
    while(retryCount <= maxRetries){
        try {
            console.log(`Attempting to confirm phone ${phoneNumber} with code (attempt ${retryCount + 1}/${maxRetries + 1})`);
            const requestBody = {
                phoneNumber,
                otp: code.toString()
            };
            // Add captcha token if provided
            if (recaptchaToken) {
                requestBody.captchaToken = recaptchaToken;
            }
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$services$2f$UserAuthenticationOtpService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserAuthenticationOtpService"].postApiV1UsersVerifyOtp({
                requestBody
            });
            console.log(`Successfully confirmed phone ${phoneNumber}`);
            return {
                success: true
            };
        } catch (error) {
            lastError = error;
            console.error(`Phone confirmation error (attempt ${retryCount + 1}):`, error);
            // Check if it's a network error or server error (not invalid code)
            if (error?.status >= 500) {
                // Server error, try again after delay
                retryCount++;
                if (retryCount <= maxRetries) {
                    console.log(`Retrying confirmation in ${retryCount * 1000}ms...`);
                    // Wait longer between each retry
                    await new Promise((resolve)=>setTimeout(resolve, retryCount * 1000));
                    continue;
                }
            } else {
                break;
            }
        }
    }
    // All retries failed or non-retryable error
    const errorDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleApiErrorWithDetails"])(lastError, lastError?.status === 400 ? "کد تایید نامعتبر است. لطفا دوباره تلاش کنید." : "خطا در تایید شماره موبایل. لطفا دوباره تلاش کنید.");
    return {
        success: false,
        error: errorDetails.message,
        status: errorDetails.status,
        details: errorDetails.body
    };
}
async function loginWithCode(phoneNumber, code) {
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$services$2f$UserAuthenticationOtpService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserAuthenticationOtpService"].postApiV1UsersVerifyOtp({
            requestBody: {
                phoneNumber,
                otp: code.toString()
            }
        });
        if (response.accessToken && response.refreshToken) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setAuthTokens"])(response.accessToken, response.refreshToken);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
            return {
                success: true
            };
        }
        return {
            success: false,
            error: "خطا در ورود. لطفا دوباره تلاش کنید.",
            details: response
        };
    } catch (error) {
        console.error("Login with code error:", error);
        const errorDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleApiErrorWithDetails"])(error, "کد تایید نامعتبر است. لطفا دوباره تلاش کنید.");
        return {
            success: false,
            error: errorDetails.message,
            status: errorDetails.status,
            details: errorDetails.body
        };
    }
}
async function resendCode(phoneNumber) {
    const maxRetries = 2;
    let retryCount = 0;
    let lastError = null;
    while(retryCount <= maxRetries){
        try {
            console.log(`Attempting to send OTP code to ${phoneNumber} (attempt ${retryCount + 1}/${maxRetries + 1})`);
            // API now requires captcha token as a required parameter
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$services$2f$UserAuthenticationOtpService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserAuthenticationOtpService"].postApiV1UsersRequestOtp({
                requestBody: {
                    phoneNumber: phoneNumber
                }
            });
            console.log(`Successfully sent OTP code to ${phoneNumber}`);
            return {
                success: true
            };
        } catch (error) {
            lastError = error;
            console.error(`Resend code error (attempt ${retryCount + 1}):`, error);
            if (error?.status === 422) {
                const errorDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleApiErrorWithDetails"])(error, "کد قبلا فرستاده شده");
                return {
                    success: false,
                    error: errorDetails.message,
                    status: errorDetails.status,
                    details: {
                        type: errorDetails.type,
                        title: errorDetails.title,
                        status: errorDetails.status,
                        detail: errorDetails.detail,
                        message: errorDetails.detail
                    }
                };
            }
            if (error?.status === 429 || error?.status >= 500) {
                retryCount++;
                if (retryCount <= maxRetries) {
                    console.log(`Retrying in ${retryCount * 1000}ms...`);
                    await new Promise((resolve)=>setTimeout(resolve, retryCount * 1000));
                    continue;
                }
            } else {
                break;
            }
        }
    }
    const errorDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleApiErrorWithDetails"])(lastError, "خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.");
    return {
        success: false,
        error: errorDetails.message,
        status: errorDetails.status,
        details: {
            type: errorDetails.type,
            title: errorDetails.title,
            status: errorDetails.status,
            detail: errorDetails.detail,
            message: errorDetails.detail
        }
    };
} // Request forgot password OTP
 // export async function requestForgotPassword(
 //   phoneNumber: string,
 //   recaptchaToken?: string
 // ) {
 //   try {
 //     const requestBody: any = { phoneNumber };
 //     if (recaptchaToken) {
 //       requestBody.captchaToken = recaptchaToken;
 //     }
 //     await AuthService.petInsurancePlatformUsersEndpointsAuthForgetPasswordRequestEndpoint(
 //       {
 //         requestBody,
 //       }
 //     );
 //     return { success: true };
 //   } catch (error: any) {
 //     console.error("Forgot password request error:", error.body?.detail);
 //     const errorDetails = handleApiErrorWithDetails(error, "خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.");
 //     return {
 //       success: false,
 //       error: errorDetails.message,
 //       status: errorDetails.status,
 //       details: errorDetails.body,
 //     };
 //   }
 // }
 // Verify forgot password OTP
 // export async function verifyForgotPassword(phoneNumber: string, code: number, captchaToken: string) { 
 //   try {
 //     const response =
 //       await AuthService.petInsurancePlatformUsersEndpointsAuthForgetPasswordVerifyEndpoint(
 //         {
 //           requestBody: {
 //             phoneNumber,
 //             code,
 //             captchaToken
 //           },
 //         }
 //       );
 //     return {
 //       success: true,
 //       resetToken: response.resetToken,
 //     };
 //   } catch (error: any) {
 //     console.error("Forgot password verification error:", error);
 //     const errorDetails = handleApiErrorWithDetails(error, "کد تایید نامعتبر است. لطفا دوباره تلاش کنید.");
 //     return {
 //       success: false,
 //       error: errorDetails.message,
 //       status: errorDetails.status,
 //       details: errorDetails.body,
 //     };
 //   }
 // }
 // Reset password with token
 // export async function resetPassword(
 //   resetToken: string,
 //   phoneNumber: string,
 //   password: string,
 //   rePassword: string,
 //   captchaToken: string
 // ) {
 //   try {
 //     await AuthService.petInsurancePlatformUsersEndpointsAuthResetPasswordEndpoint(
 //       {
 //         requestBody: {
 //           resetToken,
 //           phoneNumber: phoneNumber,
 //           newPassword: password,
 //           confirmPassword: rePassword,
 //           captchaToken : captchaToken
 //         },
 //       }
 //     );
 //     return { success: true };
 //   } catch (error: any) {
 //     console.error("Reset password error:", error);
 //     const errorDetails = handleApiErrorWithDetails(error, "خطا در تغییر رمز عبور. لطفا دوباره تلاش کنید.");
 //     return {
 //       success: false,
 //       error: errorDetails.message,
 //       status: errorDetails.status,
 //       details: errorDetails.body,
 //     };
 //   }
 // }
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    checkRegistration,
    confirmPhoneNumber,
    loginWithCode,
    resendCode
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkRegistration, "4075ac5d6c663f8da0e777b782a227a562850e9713", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(confirmPhoneNumber, "700f36a9f9a410bd8d03991d81da2fbb06210d091d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loginWithCode, "60d7d312321c14caeee5da8b68be183845c991f0b1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resendCode, "40e942b44d821644d8e483022613ff3d4407131d2f", null);
}),
"[project]/.next-internal/server/app/(auth)/login/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/auth.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/auth.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/(auth)/login/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/auth.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40e942b44d821644d8e483022613ff3d4407131d2f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resendCode"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$auth$292f$login$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(auth)/login/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/actions/auth.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/auth.ts [app-rsc] (ecmascript)");
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/not-found.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/not-found.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/(auth)/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(auth)/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/(auth)/login/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(auth)/login/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/(auth)/login/page.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/(auth)/login/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/(auth)/login/page.tsx <module evaluation>", "default");
}),
"[project]/src/app/(auth)/login/page.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/(auth)/login/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/(auth)/login/page.tsx", "default");
}),
"[project]/src/app/(auth)/login/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$login$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/(auth)/login/page.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$login$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/(auth)/login/page.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$login$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/(auth)/login/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(auth)/login/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ca6f06db._.js.map