module.exports = [
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
(()=>{
    const e = new Error("Cannot find module '@/swagger/services/AuthService'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
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
        const response = await AuthService.petInsurancePlatformUsersInfrastructureAuthenticationUserTokenService({
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

/* __next_internal_action_entry_do_not_use__ [{"6075ac5d6c663f8da0e777b782a227a562850e9713":"checkRegistration","6095cb601772edc007384a1a36203ba0fd4d47b14c":"loginWithPassword","60b35f19d9960d71df1461b6f58b6f644d6f957445":"requestForgotPassword","60d7d312321c14caeee5da8b68be183845c991f0b1":"loginWithCode","60e942b44d821644d8e483022613ff3d4407131d2f":"resendCode","700f36a9f9a410bd8d03991d81da2fbb06210d091d":"confirmPhoneNumber","70185954439840c1c6769e8f5fe803729594d38c22":"verifyForgotPassword","7c4906c4bb95f4b79b4386552128807984d4fa5785":"resetPassword","7cae119d72d726026a4c53c2df4b2ff24c66006602":"setUserProfile"},"",""] */ __turbopack_context__.s([
    "checkRegistration",
    ()=>checkRegistration,
    "confirmPhoneNumber",
    ()=>confirmPhoneNumber,
    "loginWithCode",
    ()=>loginWithCode,
    "loginWithPassword",
    ()=>loginWithPassword,
    "requestForgotPassword",
    ()=>requestForgotPassword,
    "resendCode",
    ()=>resendCode,
    "resetPassword",
    ()=>resetPassword,
    "setUserProfile",
    ()=>setUserProfile,
    "verifyForgotPassword",
    ()=>verifyForgotPassword
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/swagger/services/AuthService'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-error-handler.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function checkRegistration(phoneNumber, recaptchaToken) {
    try {
        const requestBody = {
            phoneNumber
        };
        if (recaptchaToken) {
            requestBody.captchaToken = recaptchaToken;
        }
        const result = await AuthService.petInsurancePlatformUsersEndpointsAuthRegisterEndpoint({
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
                code
            };
            // Add captcha token if provided
            if (recaptchaToken) {
                requestBody.captchaToken = recaptchaToken;
            }
            await AuthService.petInsurancePlatformUsersEndpointsAuthConfirmPhoneNumberEndpoint({
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
async function setUserProfile(phoneNumber, firstName, lastName, password, rePassword) {
    try {
        await AuthService.petInsurancePlatformUsersEndpointsAuthSetProfileEndpoint({
            requestBody: {
                phoneNumber,
                firstName,
                lastName,
                password,
                rePassword
            }
        });
        return {
            success: true
        };
    } catch (error) {
        console.error("Set profile error:", error);
        const errorDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleApiErrorWithDetails"])(error, "خطا در ثبت اطلاعات کاربری. لطفا دوباره تلاش کنید.");
        return {
            success: false,
            error: errorDetails.message,
            status: errorDetails.status,
            details: errorDetails.body
        };
    }
}
async function loginWithPassword(phoneNumber, password) {
    try {
        const response = await AuthService.petInsurancePlatformUsersEndpointsAuthLoginByPasswordEndpoint({
            requestBody: {
                phoneNumber,
                password
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
        console.error("Login with password error:", error);
        const errorDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleApiErrorWithDetails"])(error, "اطلاعات ورود نامعتبر است. لطفا دوباره تلاش کنید.");
        return {
            success: false,
            error: errorDetails.message,
            status: errorDetails.status,
            details: errorDetails.body
        };
    }
}
async function loginWithCode(phoneNumber, code) {
    try {
        const response = await AuthService.petInsurancePlatformUsersEndpointsAuthLoginByCodeEndpoint({
            requestBody: {
                phoneNumber,
                code
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
async function resendCode(phoneNumber, recaptchaToken) {
    const maxRetries = 2;
    let retryCount = 0;
    let lastError = null;
    while(retryCount <= maxRetries){
        try {
            console.log(`Attempting to send OTP code to ${phoneNumber} (attempt ${retryCount + 1}/${maxRetries + 1})`);
            // API now requires captcha token as a required parameter
            await AuthService.petInsurancePlatformUsersEndpointsAuthResendCodeEndpoint({
                phoneNumber,
                captchaToken: recaptchaToken
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
}
async function requestForgotPassword(phoneNumber, recaptchaToken) {
    try {
        const requestBody = {
            phoneNumber
        };
        if (recaptchaToken) {
            requestBody.captchaToken = recaptchaToken;
        }
        await AuthService.petInsurancePlatformUsersEndpointsAuthForgetPasswordRequestEndpoint({
            requestBody
        });
        return {
            success: true
        };
    } catch (error) {
        console.error("Forgot password request error:", error.body?.detail);
        const errorDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleApiErrorWithDetails"])(error, "خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.");
        return {
            success: false,
            error: errorDetails.message,
            status: errorDetails.status,
            details: errorDetails.body
        };
    }
}
async function verifyForgotPassword(phoneNumber, code, captchaToken) {
    try {
        const response = await AuthService.petInsurancePlatformUsersEndpointsAuthForgetPasswordVerifyEndpoint({
            requestBody: {
                phoneNumber,
                code,
                captchaToken
            }
        });
        return {
            success: true,
            resetToken: response.resetToken
        };
    } catch (error) {
        console.error("Forgot password verification error:", error);
        const errorDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleApiErrorWithDetails"])(error, "کد تایید نامعتبر است. لطفا دوباره تلاش کنید.");
        return {
            success: false,
            error: errorDetails.message,
            status: errorDetails.status,
            details: errorDetails.body
        };
    }
}
async function resetPassword(resetToken, phoneNumber, password, rePassword, captchaToken) {
    try {
        await AuthService.petInsurancePlatformUsersEndpointsAuthResetPasswordEndpoint({
            requestBody: {
                resetToken,
                phoneNumber: phoneNumber,
                newPassword: password,
                confirmPassword: rePassword,
                captchaToken: captchaToken
            }
        });
        return {
            success: true
        };
    } catch (error) {
        console.error("Reset password error:", error);
        const errorDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleApiErrorWithDetails"])(error, "خطا در تغییر رمز عبور. لطفا دوباره تلاش کنید.");
        return {
            success: false,
            error: errorDetails.message,
            status: errorDetails.status,
            details: errorDetails.body
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    checkRegistration,
    confirmPhoneNumber,
    setUserProfile,
    loginWithPassword,
    loginWithCode,
    resendCode,
    requestForgotPassword,
    verifyForgotPassword,
    resetPassword
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkRegistration, "6075ac5d6c663f8da0e777b782a227a562850e9713", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(confirmPhoneNumber, "700f36a9f9a410bd8d03991d81da2fbb06210d091d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(setUserProfile, "7cae119d72d726026a4c53c2df4b2ff24c66006602", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loginWithPassword, "6095cb601772edc007384a1a36203ba0fd4d47b14c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loginWithCode, "60d7d312321c14caeee5da8b68be183845c991f0b1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resendCode, "60e942b44d821644d8e483022613ff3d4407131d2f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(requestForgotPassword, "60b35f19d9960d71df1461b6f58b6f644d6f957445", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(verifyForgotPassword, "70185954439840c1c6769e8f5fe803729594d38c22", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resetPassword, "7c4906c4bb95f4b79b4386552128807984d4fa5785", null);
}),
"[project]/.next-internal/server/app/(auth)/login/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/auth.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/auth.ts [app-rsc] (ecmascript)");
;
;
;
;
;
}),
"[project]/.next-internal/server/app/(auth)/login/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/auth.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "6075ac5d6c663f8da0e777b782a227a562850e9713",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkRegistration"],
    "60b35f19d9960d71df1461b6f58b6f644d6f957445",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requestForgotPassword"],
    "60e942b44d821644d8e483022613ff3d4407131d2f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resendCode"],
    "70185954439840c1c6769e8f5fe803729594d38c22",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifyForgotPassword"],
    "7c4906c4bb95f4b79b4386552128807984d4fa5785",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resetPassword"]
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

//# sourceMappingURL=%5Broot-of-the-server%5D__f423c9f7._.js.map