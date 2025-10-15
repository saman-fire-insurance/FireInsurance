module.exports = [
"[project]/.next-internal/server/app/api/auth/[...nextauth]/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/lib/api-error-handler.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/swagger/core/OpenAPI.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* generated using openapi-typescript-codegen -- do not edit */ /* istanbul ignore file */ /* tslint:disable */ /* eslint-disable */ __turbopack_context__.s([
    "OpenAPI",
    ()=>OpenAPI
]);
const OpenAPI = {
    BASE: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
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
"[project]/src/lib/openapi-config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * OpenAPI configuration initializer
 * This module should be imported early to ensure the correct base URL is set
 * before any API calls are made.
 */ __turbopack_context__.s([
    "initializeOpenAPI",
    ()=>initializeOpenAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$OpenAPI$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/swagger/core/OpenAPI.ts [app-route] (ecmascript)");
;
// Initialize OpenAPI configuration with environment variables
function initializeOpenAPI() {
    // Set base URL from environment variable, fallback to current base if not set
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (baseUrl) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$OpenAPI$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAPI"].BASE = baseUrl;
        console.log('🔧 [OpenAPI] Base URL set to:', baseUrl);
    } else {
        console.warn('⚠️ [OpenAPI] NEXT_PUBLIC_API_URL not found, using default:', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$OpenAPI$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAPI"].BASE);
    }
}
// Initialize immediately when this module is imported
initializeOpenAPI();
;
}),
"[project]/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authOptions",
    ()=>authOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$11_next$40$15$2e$5_e3b532296a39ef48a9442ac4fbf1f535$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@4.24.11_next@15.5_e3b532296a39ef48a9442ac4fbf1f535/node_modules/next-auth/providers/credentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-error-handler.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$OpenAPI$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/swagger/core/OpenAPI.ts [app-route] (ecmascript)");
// Initialize OpenAPI configuration early
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$openapi$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/openapi-config.ts [app-route] (ecmascript)");
;
;
;
;
const authOptions = {
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$11_next$40$15$2e$5_e3b532296a39ef48a9442ac4fbf1f535$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            id: "otp-login",
            name: "OTP Login",
            credentials: {
                phoneNumber: {
                    label: "Phone Number",
                    type: "text"
                },
                code: {
                    label: "Code",
                    type: "text"
                },
                recaptchaToken: {
                    label: "ReCAPTCHA Token",
                    type: "text"
                }
            },
            async authorize (credentials) {
                if (!credentials?.phoneNumber || !credentials?.code) {
                    throw new Error("شماره تلفن و کد تایید الزامی است");
                }
                try {
                    const requestBody = {
                        phoneNumber: credentials.phoneNumber,
                        code: parseInt(credentials.code)
                    };
                    // Add captcha token if provided
                    if (credentials.recaptchaToken) {
                        requestBody.captchaToken = credentials.recaptchaToken;
                    }
                    const check = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$OpenAPI$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAPI"];
                    const response = await AuthService.petInsurancePlatformUsersEndpointsAuthLoginByCodeEndpoint({
                        requestBody
                    });
                    if (response?.accessToken && response?.refreshToken && response.userId) {
                        return {
                            id: response.userId,
                            phoneNumber: credentials.phoneNumber,
                            accessToken: response.accessToken,
                            refreshToken: response.refreshToken
                        };
                    }
                    throw new Error("پاسخ نامعتبر از سرور");
                } catch (error) {
                    console.error("OTP login error:", error);
                    const errorMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleApiErrorWithCleanup"])(error, "کد تایید نامعتبر است. لطفا دوباره تلاش کنید.");
                    throw new Error(errorMessage);
                }
            }
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$11_next$40$15$2e$5_e3b532296a39ef48a9442ac4fbf1f535$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            id: "password-login",
            name: "Password Login",
            credentials: {
                phoneNumber: {
                    label: "Phone Number",
                    type: "text"
                },
                password: {
                    label: "Password",
                    type: "password"
                },
                recaptchaToken: {
                    label: "ReCAPTCHA Token",
                    type: "text"
                }
            },
            async authorize (credentials) {
                if (!credentials?.phoneNumber || !credentials?.password) {
                    console.error("❌ [AUTH] Missing credentials for password login");
                    throw new Error("شماره تلفن و رمز عبور الزامی است");
                }
                try {
                    console.log("🔐 [AUTH] Attempting password login for:", credentials.phoneNumber);
                    const requestBody = {
                        phoneNumber: credentials.phoneNumber,
                        password: credentials.password
                    };
                    // Add captcha token if provided
                    if (credentials.recaptchaToken) {
                        requestBody.captchaToken = credentials.recaptchaToken;
                    }
                    const check = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$OpenAPI$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAPI"];
                    const response = await AuthService.petInsurancePlatformUsersEndpointsAuthLoginByPasswordEndpoint({
                        requestBody
                    });
                    console.log("🔐 [AUTH] Login API response received");
                    if (response?.accessToken && response?.refreshToken && response.userId) {
                        console.log("✅ [AUTH] Login successful for user:", response.userId);
                        return {
                            id: response.userId,
                            phoneNumber: credentials.phoneNumber,
                            accessToken: response.accessToken,
                            refreshToken: response.refreshToken
                        };
                    }
                    console.error("❌ [AUTH] Invalid response from login API:", response);
                    throw new Error("پاسخ نامعتبر از سرور");
                } catch (error) {
                    console.error("❌ [AUTH] Password login API error:", error);
                    const errorMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleApiErrorWithCleanup"])(error, "اطلاعات ورود نامعتبر است. لطفا دوباره تلاش کنید.");
                    console.log("🔐 [AUTH] Throwing error:", errorMessage);
                    throw new Error(errorMessage);
                }
            }
        })
    ],
    callbacks: {
        async jwt ({ token, user }) {
            // The user object passed here contains the data returned by the authorize function
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.sub = user.id; // Store user ID in token
                token.id = user.id;
            }
            return token;
        },
        async session ({ session, token }) {
            // The token object contains the data from the jwt callback
            if (token) {
                session.accessToken = token.accessToken;
                session.refreshToken = token.refreshToken;
                // Ensure user ID is available for refresh token operations
                if (session.user && token.sub) {
                    session.user.id = token.sub;
                }
            }
            return session;
        },
        async signIn ({ user, account, profile, email, credentials }) {
            // This callback is called when sign in succeeds
            console.log("🔐 [AUTH CALLBACK] SignIn callback called with user:", user);
            return true; // Allow sign in
        }
    },
    events: {
        async signIn (message) {
            console.log("🔐 [AUTH EVENT] Sign in event:", message);
        },
        async signOut (message) {
            console.log("🔐 [AUTH EVENT] Sign out event");
            try {
                // Try to get token from session first, then from token
                const accessToken = message.session?.accessToken || message.token?.accessToken;
                if (accessToken) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$OpenAPI$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAPI"].TOKEN = accessToken;
                    const response = await AuthService.petInsurancePlatformUsersEndpointsAuthLogoutEndpoint();
                    console.log("🔐 [AUTH EVENT] Backend logout successful", response);
                } else {
                    console.log("🔐 [AUTH EVENT] No access token found - skipping backend logout");
                }
            } catch (error) {
                console.error("🔐 [AUTH EVENT] Logout API error:", error);
                // Don't throw the error - logout should succeed even if API call fails
                if (error?.status === 401) {
                    console.log("🔐 [AUTH EVENT] Token expired/invalid - continuing with logout");
                }
            } finally{
                // Always clear the token after logout attempt
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$swagger$2f$core$2f$OpenAPI$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAPI"].TOKEN = undefined;
            }
        }
    },
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60,
        updateAge: 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET
};
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/app/api/auth/[...nextauth]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>handler,
    "POST",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$11_next$40$15$2e$5_e3b532296a39ef48a9442ac4fbf1f535$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@4.24.11_next@15.5_e3b532296a39ef48a9442ac4fbf1f535/node_modules/next-auth/index.js [app-route] (ecmascript)");
;
;
const handler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$11_next$40$15$2e$5_e3b532296a39ef48a9442ac4fbf1f535$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ddbf0c2a._.js.map