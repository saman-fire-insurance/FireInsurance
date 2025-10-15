module.exports = [
"[project]/src/hooks/useProtectedRoute.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProtectedRoute",
    ()=>useProtectedRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$11_next$40$15$2e$5_e3b532296a39ef48a9442ac4fbf1f535$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@4.24.11_next@15.5_e3b532296a39ef48a9442ac4fbf1f535/node_modules/next-auth/react/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function useProtectedRoute(options = {}) {
    const { redirectTo = "/login", redirectIfFound = false } = options;
    const { data: session, status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$11_next$40$15$2e$5_e3b532296a39ef48a9442ac4fbf1f535$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSession"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Handle loading state
        if (status === "loading") {
            return;
        }
        // Get the redirect URL from query params
        const redirectUrl = searchParams?.get("redirectUrl") || "/";
        // Handle authenticated users
        if (session) {
            if (redirectIfFound) {
                // For auth pages (login, register), redirect away if authenticated
                router.replace(redirectUrl || "/");
            } else {
                // For protected pages, user is authenticated so we're good
                setIsLoading(false);
            }
            return;
        }
        // Handle unauthenticated users on protected pages
        if (!redirectIfFound && !session) {
            // Get current URL for redirecting back after login
            const currentUrl = window.location.pathname + window.location.search;
            router.replace(`${redirectTo}?redirectUrl=${encodeURIComponent(currentUrl)}`);
            return;
        }
        // User is not authenticated and on auth page, or is authenticated and on protected page
        setIsLoading(false);
    }, [
        session,
        status,
        router,
        redirectIfFound,
        redirectTo,
        searchParams
    ]);
    return {
        isLoading,
        isAuthenticated: !!session,
        session
    };
}
}),
"[project]/src/app/actions/data:dd2c66 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40e942b44d821644d8e483022613ff3d4407131d2f":"resendCode"},"src/app/actions/auth.ts",""] */ __turbopack_context__.s([
    "resendCode",
    ()=>resendCode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var resendCode = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("40e942b44d821644d8e483022613ff3d4407131d2f", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "resendCode"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYXV0aC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcclxuXHJcbmltcG9ydCB7IFVzZXJBdXRoZW50aWNhdGlvbk90cFNlcnZpY2UgfSBmcm9tIFwiQC9zd2FnZ2VyL3NlcnZpY2VzL1VzZXJBdXRoZW50aWNhdGlvbk90cFNlcnZpY2VcIjtcclxuaW1wb3J0IHsgc2V0QXV0aFRva2VucyB9IGZyb20gXCJAL3V0aWxzL2F1dGhcIjtcclxuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xyXG5pbXBvcnQgeyBoYW5kbGVBcGlFcnJvcldpdGhDbGVhbnVwLCBoYW5kbGVBcGlFcnJvcldpdGhEZXRhaWxzIH0gZnJvbSBcIkAvbGliL2FwaS1lcnJvci1oYW5kbGVyXCI7XHJcblxyXG4vLyBDaGVjayBpZiB1c2VyIGlzIHJlZ2lzdGVyZWQgb3Igbm90XHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja1JlZ2lzdHJhdGlvbihcclxuICBwaG9uZU51bWJlcjogc3RyaW5nLFxyXG4gIC8vIHJlY2FwdGNoYVRva2VuPzogc3RyaW5nXHJcbikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXF1ZXN0Qm9keTogYW55ID0geyBwaG9uZU51bWJlciB9O1xyXG4gICAgLy8gaWYgKHJlY2FwdGNoYVRva2VuKSB7XHJcbiAgICAvLyAgIHJlcXVlc3RCb2R5LmNhcHRjaGFUb2tlbiA9IHJlY2FwdGNoYVRva2VuO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9XHJcbiAgICAgIGF3YWl0IFVzZXJBdXRoZW50aWNhdGlvbk90cFNlcnZpY2UucG9zdEFwaVYxVXNlcnNSZXF1ZXN0T3RwKHtcclxuICAgICAgICByZXF1ZXN0Qm9keSxcclxuICAgICAgfSk7XHJcbiAgICAvLyBBUEkgcmV0dXJucyB0cnVlIGlmIHRoZSB1c2VyIGNhbiByZWdpc3RlciAoaS5lLiwgcGhvbmUgbnVtYmVyIGlzIGF2YWlsYWJsZSlcclxuICAgIC8vIGFuZCBmYWxzZSBpZiB0aGUgdXNlciBhbHJlYWR5IGV4aXN0c1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgaXNSZWdpc3RlcmVkOiByZXN1bHQgPT09IHRydWUsXHJcbiAgICB9O1xyXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJSZWdpc3RyYXRpb24gY2hlY2sgZXJyb3I6XCIsIGVycm9yKTtcclxuICAgIGNvbnN0IGVycm9yRGV0YWlscyA9IGhhbmRsZUFwaUVycm9yV2l0aERldGFpbHMoZXJyb3IsIFwi2K7Yt9inINiv2LEg2KjYsdix2LPbjCDZiNi22LnbjNiqINqp2KfYsdio2LEuINmE2LfZgdinINiv2YjYqNin2LHZhyDYqtmE2KfYtCDaqdmG24zYry5cIik7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgZXJyb3I6IGVycm9yRGV0YWlscy5tZXNzYWdlLFxyXG4gICAgICBzdGF0dXM6IGVycm9yRGV0YWlscy5zdGF0dXMsXHJcbiAgICAgIGRldGFpbHM6IGVycm9yRGV0YWlscy5ib2R5LFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbi8vIENvbmZpcm0gcGhvbmUgbnVtYmVyIHdpdGggT1RQIGNvZGVcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbmZpcm1QaG9uZU51bWJlcihwaG9uZU51bWJlcjogc3RyaW5nLCBjb2RlOiBudW1iZXIsIHJlY2FwdGNoYVRva2VuPzogc3RyaW5nKSB7XHJcbiAgLy8gTWF4aW11bSByZXRyeSBhdHRlbXB0c1xyXG4gIGNvbnN0IG1heFJldHJpZXMgPSAxO1xyXG4gIGxldCByZXRyeUNvdW50ID0gMDtcclxuICBsZXQgbGFzdEVycm9yOiBhbnkgPSBudWxsO1xyXG5cclxuICAvLyBSZXRyeSBsb2dpY1xyXG4gIHdoaWxlIChyZXRyeUNvdW50IDw9IG1heFJldHJpZXMpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgIGBBdHRlbXB0aW5nIHRvIGNvbmZpcm0gcGhvbmUgJHtwaG9uZU51bWJlcn0gd2l0aCBjb2RlIChhdHRlbXB0ICR7XHJcbiAgICAgICAgICByZXRyeUNvdW50ICsgMVxyXG4gICAgICAgIH0vJHttYXhSZXRyaWVzICsgMX0pYFxyXG4gICAgICApO1xyXG5cclxuICAgICAgY29uc3QgcmVxdWVzdEJvZHk6IGFueSA9IHtcclxuICAgICAgICBwaG9uZU51bWJlcixcclxuICAgICAgICBvdHA6IGNvZGUudG9TdHJpbmcoKSwgLy8gQ29udmVydCBudW1iZXIgdG8gc3RyaW5nIGFuZCB1c2UgJ290cCcgaW5zdGVhZCBvZiAnY29kZSdcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIEFkZCBjYXB0Y2hhIHRva2VuIGlmIHByb3ZpZGVkXHJcbiAgICAgIGlmIChyZWNhcHRjaGFUb2tlbikge1xyXG4gICAgICAgIHJlcXVlc3RCb2R5LmNhcHRjaGFUb2tlbiA9IHJlY2FwdGNoYVRva2VuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhd2FpdCBVc2VyQXV0aGVudGljYXRpb25PdHBTZXJ2aWNlLnBvc3RBcGlWMVVzZXJzVmVyaWZ5T3RwKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHJlcXVlc3RCb2R5LFxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKGBTdWNjZXNzZnVsbHkgY29uZmlybWVkIHBob25lICR7cGhvbmVOdW1iZXJ9YCk7XHJcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgbGFzdEVycm9yID0gZXJyb3I7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgYFBob25lIGNvbmZpcm1hdGlvbiBlcnJvciAoYXR0ZW1wdCAke3JldHJ5Q291bnQgKyAxfSk6YCxcclxuICAgICAgICBlcnJvclxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3Igb3Igc2VydmVyIGVycm9yIChub3QgaW52YWxpZCBjb2RlKVxyXG4gICAgICBpZiAoZXJyb3I/LnN0YXR1cyA+PSA1MDApIHtcclxuICAgICAgICAvLyBTZXJ2ZXIgZXJyb3IsIHRyeSBhZ2FpbiBhZnRlciBkZWxheVxyXG4gICAgICAgIHJldHJ5Q291bnQrKztcclxuICAgICAgICBpZiAocmV0cnlDb3VudCA8PSBtYXhSZXRyaWVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgUmV0cnlpbmcgY29uZmlybWF0aW9uIGluICR7cmV0cnlDb3VudCAqIDEwMDB9bXMuLi5gKTtcclxuICAgICAgICAgIC8vIFdhaXQgbG9uZ2VyIGJldHdlZW4gZWFjaCByZXRyeVxyXG4gICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgcmV0cnlDb3VudCAqIDEwMDApXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIENsaWVudCBlcnJvciBvciBvdGhlciBlcnJvciwgZG9uJ3QgcmV0cnlcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQWxsIHJldHJpZXMgZmFpbGVkIG9yIG5vbi1yZXRyeWFibGUgZXJyb3JcclxuICBjb25zdCBlcnJvckRldGFpbHMgPSBoYW5kbGVBcGlFcnJvcldpdGhEZXRhaWxzKFxyXG4gICAgbGFzdEVycm9yLFxyXG4gICAgbGFzdEVycm9yPy5zdGF0dXMgPT09IDQwMFxyXG4gICAgICA/IFwi2qnYryDYqtin24zbjNivINmG2KfZhdi52KrYqNixINin2LPYqi4g2YTYt9mB2Kcg2K/ZiNio2KfYsdmHINiq2YTYp9i0INqp2YbbjNivLlwiXHJcbiAgICAgIDogXCLYrti32Kcg2K/YsSDYqtin24zbjNivINi02YXYp9ix2Ycg2YXZiNio2KfbjNmELiDZhNi32YHYpyDYr9mI2KjYp9ix2Ycg2KrZhNin2LQg2qnZhtuM2K8uXCJcclxuICApO1xyXG4gIHJldHVybiB7XHJcbiAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgIGVycm9yOiBlcnJvckRldGFpbHMubWVzc2FnZSxcclxuICAgIHN0YXR1czogZXJyb3JEZXRhaWxzLnN0YXR1cyxcclxuICAgIGRldGFpbHM6IGVycm9yRGV0YWlscy5ib2R5LFxyXG4gIH07XHJcbn1cclxuXHJcbi8vIFNldCB1c2VyIHByb2ZpbGUgZHVyaW5nIHJlZ2lzdHJhdGlvblxyXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0VXNlclByb2ZpbGUoXHJcbi8vICAgcGhvbmVOdW1iZXI6IHN0cmluZyxcclxuLy8gICBmaXJzdE5hbWU6IHN0cmluZyxcclxuLy8gICBsYXN0TmFtZTogc3RyaW5nLFxyXG4vLyAgIHBhc3N3b3JkOiBzdHJpbmcsXHJcbi8vICAgcmVQYXNzd29yZDogc3RyaW5nXHJcbi8vICkge1xyXG4vLyAgIHRyeSB7XHJcbi8vICAgICBhd2FpdCBBdXRoU2VydmljZS5wZXRJbnN1cmFuY2VQbGF0Zm9ybVVzZXJzRW5kcG9pbnRzQXV0aFNldFByb2ZpbGVFbmRwb2ludCh7XHJcbi8vICAgICAgIHJlcXVlc3RCb2R5OiB7XHJcbi8vICAgICAgICAgcGhvbmVOdW1iZXIsXHJcbi8vICAgICAgICAgZmlyc3ROYW1lLFxyXG4vLyAgICAgICAgIGxhc3ROYW1lLFxyXG4vLyAgICAgICAgIHBhc3N3b3JkLFxyXG4vLyAgICAgICAgIHJlUGFzc3dvcmQsXHJcbi8vICAgICAgIH0sXHJcbi8vICAgICB9KTtcclxuLy8gICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcclxuLy8gICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbi8vICAgICBjb25zb2xlLmVycm9yKFwiU2V0IHByb2ZpbGUgZXJyb3I6XCIsIGVycm9yKTtcclxuLy8gICAgIGNvbnN0IGVycm9yRGV0YWlscyA9IGhhbmRsZUFwaUVycm9yV2l0aERldGFpbHMoZXJyb3IsIFwi2K7Yt9inINiv2LEg2KvYqNiqINin2LfZhNin2LnYp9iqINqp2KfYsdio2LHbjC4g2YTYt9mB2Kcg2K/ZiNio2KfYsdmHINiq2YTYp9i0INqp2YbbjNivLlwiKTtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4vLyAgICAgICBlcnJvcjogZXJyb3JEZXRhaWxzLm1lc3NhZ2UsXHJcbi8vICAgICAgIHN0YXR1czogZXJyb3JEZXRhaWxzLnN0YXR1cyxcclxuLy8gICAgICAgZGV0YWlsczogZXJyb3JEZXRhaWxzLmJvZHksXHJcbi8vICAgICB9O1xyXG4vLyAgIH1cclxuLy8gfVxyXG5cclxuLy8gTG9naW4gd2l0aCBwYXNzd29yZFxyXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9naW5XaXRoUGFzc3dvcmQocGhvbmVOdW1iZXI6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xyXG4vLyAgIHRyeSB7XHJcbi8vICAgICBjb25zdCByZXNwb25zZSA9XHJcbi8vICAgICAgIGF3YWl0IEF1dGhTZXJ2aWNlLnBldEluc3VyYW5jZVBsYXRmb3JtVXNlcnNFbmRwb2ludHNBdXRoTG9naW5CeVBhc3N3b3JkRW5kcG9pbnQoXHJcbi8vICAgICAgICAge1xyXG4vLyAgICAgICAgICAgcmVxdWVzdEJvZHk6IHtcclxuLy8gICAgICAgICAgICAgcGhvbmVOdW1iZXIsXHJcbi8vICAgICAgICAgICAgIHBhc3N3b3JkLFxyXG4vLyAgICAgICAgICAgfSxcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICk7XHJcblxyXG4vLyAgICAgaWYgKHJlc3BvbnNlLmFjY2Vzc1Rva2VuICYmIHJlc3BvbnNlLnJlZnJlc2hUb2tlbikge1xyXG4vLyAgICAgICBhd2FpdCBzZXRBdXRoVG9rZW5zKHJlc3BvbnNlLmFjY2Vzc1Rva2VuLCByZXNwb25zZS5yZWZyZXNoVG9rZW4pO1xyXG4vLyAgICAgICByZXZhbGlkYXRlUGF0aChcIi9cIik7XHJcbi8vICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcclxuLy8gICAgIH1cclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4vLyAgICAgICBlcnJvcjogXCLYrti32Kcg2K/YsSDZiNix2YjYry4g2YTYt9mB2Kcg2K/ZiNio2KfYsdmHINiq2YTYp9i0INqp2YbbjNivLlwiLFxyXG4vLyAgICAgICBkZXRhaWxzOiByZXNwb25zZSxcclxuLy8gICAgIH07XHJcbi8vICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4vLyAgICAgY29uc29sZS5lcnJvcihcIkxvZ2luIHdpdGggcGFzc3dvcmQgZXJyb3I6XCIsIGVycm9yKTtcclxuLy8gICAgIGNvbnN0IGVycm9yRGV0YWlscyA9IGhhbmRsZUFwaUVycm9yV2l0aERldGFpbHMoZXJyb3IsIFwi2KfYt9mE2KfYudin2Kog2YjYsdmI2K8g2YbYp9mF2LnYqtio2LEg2KfYs9iqLiDZhNi32YHYpyDYr9mI2KjYp9ix2Ycg2KrZhNin2LQg2qnZhtuM2K8uXCIpO1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgc3VjY2VzczogZmFsc2UsXHJcbi8vICAgICAgIGVycm9yOiBlcnJvckRldGFpbHMubWVzc2FnZSxcclxuLy8gICAgICAgc3RhdHVzOiBlcnJvckRldGFpbHMuc3RhdHVzLFxyXG4vLyAgICAgICBkZXRhaWxzOiBlcnJvckRldGFpbHMuYm9keSxcclxuLy8gICAgIH07XHJcbi8vICAgfVxyXG4vLyB9XHJcblxyXG4vLyBMb2dpbiB3aXRoIE9UUCBjb2RlXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dpbldpdGhDb2RlKHBob25lTnVtYmVyOiBzdHJpbmcsIGNvZGU6IG51bWJlcikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9XHJcbiAgICAgIGF3YWl0IFVzZXJBdXRoZW50aWNhdGlvbk90cFNlcnZpY2UucG9zdEFwaVYxVXNlcnNWZXJpZnlPdHAoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcmVxdWVzdEJvZHk6IHtcclxuICAgICAgICAgICAgcGhvbmVOdW1iZXIsXHJcbiAgICAgICAgICAgIG90cDogY29kZS50b1N0cmluZygpLCAvLyBDb252ZXJ0IG51bWJlciB0byBzdHJpbmcgYW5kIHVzZSAnb3RwJyBpbnN0ZWFkIG9mICdjb2RlJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLmFjY2Vzc1Rva2VuICYmIHJlc3BvbnNlLnJlZnJlc2hUb2tlbikge1xyXG4gICAgICBhd2FpdCBzZXRBdXRoVG9rZW5zKHJlc3BvbnNlLmFjY2Vzc1Rva2VuLCByZXNwb25zZS5yZWZyZXNoVG9rZW4pO1xyXG4gICAgICByZXZhbGlkYXRlUGF0aChcIi9cIik7XHJcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICBlcnJvcjogXCLYrti32Kcg2K/YsSDZiNix2YjYry4g2YTYt9mB2Kcg2K/ZiNio2KfYsdmHINiq2YTYp9i0INqp2YbbjNivLlwiLFxyXG4gICAgICBkZXRhaWxzOiByZXNwb25zZSxcclxuICAgIH07XHJcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkxvZ2luIHdpdGggY29kZSBlcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgY29uc3QgZXJyb3JEZXRhaWxzID0gaGFuZGxlQXBpRXJyb3JXaXRoRGV0YWlscyhlcnJvciwgXCLaqdivINiq2KfbjNuM2K8g2YbYp9mF2LnYqtio2LEg2KfYs9iqLiDZhNi32YHYpyDYr9mI2KjYp9ix2Ycg2KrZhNin2LQg2qnZhtuM2K8uXCIpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgIGVycm9yOiBlcnJvckRldGFpbHMubWVzc2FnZSxcclxuICAgICAgc3RhdHVzOiBlcnJvckRldGFpbHMuc3RhdHVzLFxyXG4gICAgICBkZXRhaWxzOiBlcnJvckRldGFpbHMuYm9keSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVzZW5kQ29kZShwaG9uZU51bWJlcjogc3RyaW5nKSB7XHJcbiAgY29uc3QgbWF4UmV0cmllcyA9IDI7XHJcbiAgbGV0IHJldHJ5Q291bnQgPSAwO1xyXG4gIGxldCBsYXN0RXJyb3I6IGFueSA9IG51bGw7XHJcblxyXG4gIHdoaWxlIChyZXRyeUNvdW50IDw9IG1heFJldHJpZXMpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgIGBBdHRlbXB0aW5nIHRvIHNlbmQgT1RQIGNvZGUgdG8gJHtwaG9uZU51bWJlcn0gKGF0dGVtcHQgJHtcclxuICAgICAgICAgIHJldHJ5Q291bnQgKyAxXHJcbiAgICAgICAgfS8ke21heFJldHJpZXMgKyAxfSlgXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvLyBBUEkgbm93IHJlcXVpcmVzIGNhcHRjaGEgdG9rZW4gYXMgYSByZXF1aXJlZCBwYXJhbWV0ZXJcclxuICAgICAgYXdhaXQgVXNlckF1dGhlbnRpY2F0aW9uT3RwU2VydmljZS5wb3N0QXBpVjFVc2Vyc1JlcXVlc3RPdHAoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcmVxdWVzdEJvZHk6IHtcclxuICAgICAgICAgICAgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBjYXB0Y2hhVG9rZW46IHJlY2FwdGNoYVRva2VuLFxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKGBTdWNjZXNzZnVsbHkgc2VudCBPVFAgY29kZSB0byAke3Bob25lTnVtYmVyfWApO1xyXG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgIGxhc3RFcnJvciA9IGVycm9yO1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBSZXNlbmQgY29kZSBlcnJvciAoYXR0ZW1wdCAke3JldHJ5Q291bnQgKyAxfSk6YCwgZXJyb3IpO1xyXG5cclxuICAgICAgaWYgKGVycm9yPy5zdGF0dXMgPT09IDQyMikge1xyXG4gICAgICAgIGNvbnN0IGVycm9yRGV0YWlscyA9IGhhbmRsZUFwaUVycm9yV2l0aERldGFpbHMoZXJyb3IsIFwi2qnYryDZgtio2YTYpyDZgdix2LPYqtin2K/ZhyDYtNiv2YdcIik7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgZXJyb3I6IGVycm9yRGV0YWlscy5tZXNzYWdlLFxyXG4gICAgICAgICAgc3RhdHVzOiBlcnJvckRldGFpbHMuc3RhdHVzLFxyXG4gICAgICAgICAgZGV0YWlsczoge1xyXG4gICAgICAgICAgICB0eXBlOiBlcnJvckRldGFpbHMudHlwZSxcclxuICAgICAgICAgICAgdGl0bGU6IGVycm9yRGV0YWlscy50aXRsZSxcclxuICAgICAgICAgICAgc3RhdHVzOiBlcnJvckRldGFpbHMuc3RhdHVzLFxyXG4gICAgICAgICAgICBkZXRhaWw6IGVycm9yRGV0YWlscy5kZXRhaWwsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yRGV0YWlscy5kZXRhaWwsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChlcnJvcj8uc3RhdHVzID09PSA0MjkgfHwgZXJyb3I/LnN0YXR1cyA+PSA1MDApIHtcclxuICAgICAgICByZXRyeUNvdW50Kys7XHJcbiAgICAgICAgaWYgKHJldHJ5Q291bnQgPD0gbWF4UmV0cmllcykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYFJldHJ5aW5nIGluICR7cmV0cnlDb3VudCAqIDEwMDB9bXMuLi5gKTtcclxuICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PlxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIHJldHJ5Q291bnQgKiAxMDAwKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgZXJyb3JEZXRhaWxzID0gaGFuZGxlQXBpRXJyb3JXaXRoRGV0YWlscyhsYXN0RXJyb3IsIFwi2K7Yt9inINiv2LEg2KfYsdiz2KfZhCDaqdivINiq2KfbjNuM2K8uINmE2LfZgdinINiv2YjYqNin2LHZhyDYqtmE2KfYtCDaqdmG24zYry5cIik7XHJcbiAgcmV0dXJuIHtcclxuICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgZXJyb3I6IGVycm9yRGV0YWlscy5tZXNzYWdlLFxyXG4gICAgc3RhdHVzOiBlcnJvckRldGFpbHMuc3RhdHVzLFxyXG4gICAgZGV0YWlsczoge1xyXG4gICAgICB0eXBlOiBlcnJvckRldGFpbHMudHlwZSxcclxuICAgICAgdGl0bGU6IGVycm9yRGV0YWlscy50aXRsZSxcclxuICAgICAgc3RhdHVzOiBlcnJvckRldGFpbHMuc3RhdHVzLFxyXG4gICAgICBkZXRhaWw6IGVycm9yRGV0YWlscy5kZXRhaWwsXHJcbiAgICAgIG1lc3NhZ2U6IGVycm9yRGV0YWlscy5kZXRhaWwsXHJcbiAgICB9LFxyXG4gIH07XHJcbn1cclxuXHJcbi8vIFJlcXVlc3QgZm9yZ290IHBhc3N3b3JkIE9UUFxyXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdEZvcmdvdFBhc3N3b3JkKFxyXG4vLyAgIHBob25lTnVtYmVyOiBzdHJpbmcsXHJcbi8vICAgcmVjYXB0Y2hhVG9rZW4/OiBzdHJpbmdcclxuLy8gKSB7XHJcbi8vICAgdHJ5IHtcclxuLy8gICAgIGNvbnN0IHJlcXVlc3RCb2R5OiBhbnkgPSB7IHBob25lTnVtYmVyIH07XHJcbi8vICAgICBpZiAocmVjYXB0Y2hhVG9rZW4pIHtcclxuLy8gICAgICAgcmVxdWVzdEJvZHkuY2FwdGNoYVRva2VuID0gcmVjYXB0Y2hhVG9rZW47XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgYXdhaXQgQXV0aFNlcnZpY2UucGV0SW5zdXJhbmNlUGxhdGZvcm1Vc2Vyc0VuZHBvaW50c0F1dGhGb3JnZXRQYXNzd29yZFJlcXVlc3RFbmRwb2ludChcclxuLy8gICAgICAge1xyXG4vLyAgICAgICAgIHJlcXVlc3RCb2R5LFxyXG4vLyAgICAgICB9XHJcbi8vICAgICApO1xyXG4vLyAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xyXG4vLyAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuLy8gICAgIGNvbnNvbGUuZXJyb3IoXCJGb3Jnb3QgcGFzc3dvcmQgcmVxdWVzdCBlcnJvcjpcIiwgZXJyb3IuYm9keT8uZGV0YWlsKTtcclxuLy8gICAgIGNvbnN0IGVycm9yRGV0YWlscyA9IGhhbmRsZUFwaUVycm9yV2l0aERldGFpbHMoZXJyb3IsIFwi2K7Yt9inINiv2LEg2KfYsdiz2KfZhCDaqdivINiq2KfbjNuM2K8uINmE2LfZgdinINiv2YjYqNin2LHZhyDYqtmE2KfYtCDaqdmG24zYry5cIik7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuLy8gICAgICAgZXJyb3I6IGVycm9yRGV0YWlscy5tZXNzYWdlLFxyXG4vLyAgICAgICBzdGF0dXM6IGVycm9yRGV0YWlscy5zdGF0dXMsXHJcbi8vICAgICAgIGRldGFpbHM6IGVycm9yRGV0YWlscy5ib2R5LFxyXG4vLyAgICAgfTtcclxuLy8gICB9XHJcbi8vIH1cclxuXHJcbi8vIFZlcmlmeSBmb3Jnb3QgcGFzc3dvcmQgT1RQXHJcbi8vIGV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlGb3Jnb3RQYXNzd29yZChwaG9uZU51bWJlcjogc3RyaW5nLCBjb2RlOiBudW1iZXIsIGNhcHRjaGFUb2tlbjogc3RyaW5nKSB7IFxyXG4vLyAgIHRyeSB7XHJcbi8vICAgICBjb25zdCByZXNwb25zZSA9XHJcbi8vICAgICAgIGF3YWl0IEF1dGhTZXJ2aWNlLnBldEluc3VyYW5jZVBsYXRmb3JtVXNlcnNFbmRwb2ludHNBdXRoRm9yZ2V0UGFzc3dvcmRWZXJpZnlFbmRwb2ludChcclxuLy8gICAgICAgICB7XHJcbi8vICAgICAgICAgICByZXF1ZXN0Qm9keToge1xyXG4vLyAgICAgICAgICAgICBwaG9uZU51bWJlcixcclxuLy8gICAgICAgICAgICAgY29kZSxcclxuLy8gICAgICAgICAgICAgY2FwdGNoYVRva2VuXHJcbi8vICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgKTtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbi8vICAgICAgIHJlc2V0VG9rZW46IHJlc3BvbnNlLnJlc2V0VG9rZW4sXHJcbi8vICAgICB9O1xyXG4vLyAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuLy8gICAgIGNvbnNvbGUuZXJyb3IoXCJGb3Jnb3QgcGFzc3dvcmQgdmVyaWZpY2F0aW9uIGVycm9yOlwiLCBlcnJvcik7XHJcbi8vICAgICBjb25zdCBlcnJvckRldGFpbHMgPSBoYW5kbGVBcGlFcnJvcldpdGhEZXRhaWxzKGVycm9yLCBcItqp2K8g2KrYp9uM24zYryDZhtin2YXYudiq2KjYsSDYp9iz2KouINmE2LfZgdinINiv2YjYqNin2LHZhyDYqtmE2KfYtCDaqdmG24zYry5cIik7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuLy8gICAgICAgZXJyb3I6IGVycm9yRGV0YWlscy5tZXNzYWdlLFxyXG4vLyAgICAgICBzdGF0dXM6IGVycm9yRGV0YWlscy5zdGF0dXMsXHJcbi8vICAgICAgIGRldGFpbHM6IGVycm9yRGV0YWlscy5ib2R5LFxyXG4vLyAgICAgfTtcclxuLy8gICB9XHJcbi8vIH1cclxuXHJcbi8vIFJlc2V0IHBhc3N3b3JkIHdpdGggdG9rZW5cclxuLy8gZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlc2V0UGFzc3dvcmQoXHJcbi8vICAgcmVzZXRUb2tlbjogc3RyaW5nLFxyXG4vLyAgIHBob25lTnVtYmVyOiBzdHJpbmcsXHJcbi8vICAgcGFzc3dvcmQ6IHN0cmluZyxcclxuLy8gICByZVBhc3N3b3JkOiBzdHJpbmcsXHJcbi8vICAgY2FwdGNoYVRva2VuOiBzdHJpbmdcclxuLy8gKSB7XHJcbi8vICAgdHJ5IHtcclxuLy8gICAgIGF3YWl0IEF1dGhTZXJ2aWNlLnBldEluc3VyYW5jZVBsYXRmb3JtVXNlcnNFbmRwb2ludHNBdXRoUmVzZXRQYXNzd29yZEVuZHBvaW50KFxyXG4vLyAgICAgICB7XHJcbi8vICAgICAgICAgcmVxdWVzdEJvZHk6IHtcclxuLy8gICAgICAgICAgIHJlc2V0VG9rZW4sXHJcbi8vICAgICAgICAgICBwaG9uZU51bWJlcjogcGhvbmVOdW1iZXIsXHJcbi8vICAgICAgICAgICBuZXdQYXNzd29yZDogcGFzc3dvcmQsXHJcbi8vICAgICAgICAgICBjb25maXJtUGFzc3dvcmQ6IHJlUGFzc3dvcmQsXHJcbi8vICAgICAgICAgICBjYXB0Y2hhVG9rZW4gOiBjYXB0Y2hhVG9rZW5cclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICB9XHJcbi8vICAgICApO1xyXG4vLyAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9O1xyXG4vLyAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuLy8gICAgIGNvbnNvbGUuZXJyb3IoXCJSZXNldCBwYXNzd29yZCBlcnJvcjpcIiwgZXJyb3IpO1xyXG4vLyAgICAgY29uc3QgZXJyb3JEZXRhaWxzID0gaGFuZGxlQXBpRXJyb3JXaXRoRGV0YWlscyhlcnJvciwgXCLYrti32Kcg2K/YsSDYqti624zbjNixINix2YXYsiDYudio2YjYsS4g2YTYt9mB2Kcg2K/ZiNio2KfYsdmHINiq2YTYp9i0INqp2YbbjNivLlwiKTtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4vLyAgICAgICBlcnJvcjogZXJyb3JEZXRhaWxzLm1lc3NhZ2UsXHJcbi8vICAgICAgIHN0YXR1czogZXJyb3JEZXRhaWxzLnN0YXR1cyxcclxuLy8gICAgICAgZGV0YWlsczogZXJyb3JEZXRhaWxzLmJvZHksXHJcbi8vICAgICB9O1xyXG4vLyAgIH1cclxuLy8gfVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjJSQXdOc0IifQ==
}),
"[project]/src/assets/icon/logo.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const Main = ({ className, style })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "104",
            height: "42",
            viewBox: "0 0 104 42",
            fill: "none",
            className: className,
            style: style,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M79.631 5.32958L79.6334 0.574102C79.6334 0.527134 79.6565 0.503656 79.7027 0.503656C83.9208 0.509324 88.3552 0.508106 93.0059 0.500008C93.81 0.499199 94.5218 0.557504 95.1413 0.674923C99.2858 1.46204 102.348 4.53761 103.031 8.66267C103.132 9.27406 103.181 10.0243 103.179 10.9135C103.168 15.1721 103.165 19.4984 103.17 23.8923C103.17 23.9393 103.147 23.9628 103.101 23.9628L98.4197 23.964C98.3881 23.964 98.3723 23.9482 98.3723 23.9166C98.344 19.8904 98.3399 15.9309 98.3602 12.0383C98.365 11.0568 98.3108 10.3377 98.1974 9.88099C97.8573 8.52055 96.9718 7.47957 95.8749 6.61107C94.6141 5.61503 93.2172 5.32958 91.6539 5.32958C87.6447 5.33039 83.637 5.33039 79.631 5.32958Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M10.6808 22.9692C13.3604 22.7432 15.9295 21.395 17.7296 19.4223C18.9504 18.0837 20.108 16.4306 20.6509 14.7677C20.8441 14.1773 20.9194 13.5833 20.9364 12.9675C20.9761 11.5617 21.0044 10.1964 21.0214 8.87159C21.0396 7.54273 21.2911 6.50782 21.7527 5.30165C21.768 5.26035 21.7976 5.2397 21.8413 5.2397L23.5079 5.23483C23.5451 5.23483 23.5637 5.25346 23.5637 5.29071C23.5427 7.13945 23.4006 8.78575 23.1374 10.2296C22.8029 12.0686 22.4369 13.723 22.0393 15.1928C21.9243 15.6195 21.783 16.0722 21.6154 16.5508C21.4332 17.0699 21.2518 17.529 21.0712 17.9282C19.9229 20.4645 18.4516 22.6902 16.6571 24.6054C15.4606 25.8832 13.8354 27.161 12.2478 27.8546C10.1771 28.76 8.08466 29.0519 5.9703 28.7304C4.29161 28.4761 2.95587 27.6943 1.96307 26.3849C0.47387 24.4231 0.182346 21.8796 0.509096 19.4114C0.730977 17.7286 1.12089 16.1204 1.67883 14.5867C2.00194 13.6983 2.47324 12.6452 3.09272 11.4273C3.96972 9.70324 4.7621 8.26061 5.46985 7.09937C5.55083 6.96738 5.67271 6.91191 5.83547 6.93296C5.88163 6.93863 5.9043 6.96454 5.90349 7.01069C5.89216 7.71845 5.77433 8.31364 5.55002 8.79628C4.60743 10.8236 3.59196 12.8837 2.92388 15.0009C2.5781 16.0981 2.48538 17.2464 2.64572 18.4457C3.05871 21.5213 5.56824 22.9607 8.46161 23.0348C9.1969 23.0542 9.93664 23.0323 10.6808 22.9692Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M27.8856 19.0919C27.9451 19.002 28.0289 18.8976 28.0641 18.798C28.3702 17.9542 28.6856 17.1132 29.0104 16.2751C29.0266 16.233 29.0569 16.2168 29.1015 16.2265C30.2979 16.4791 30.6745 17.8068 30.5797 18.883C30.3854 21.0937 29.2217 24.8204 26.428 24.8337C25.5303 24.8386 24.81 24.2895 24.278 23.5753C23.7824 22.9109 23.3475 22.1748 23.254 21.3694C23.1188 20.2025 23.1188 19.0069 23.254 17.7825C23.7318 13.4623 24.2363 9.29754 24.7675 5.28828C24.7701 5.26982 24.7793 5.25292 24.7933 5.24065C24.8074 5.22839 24.8254 5.22158 24.844 5.22147L26.4231 5.21904C26.4822 5.21904 26.5077 5.2486 26.4996 5.30772C26.1182 8.12699 25.6688 10.9815 25.5279 13.7668C25.4404 15.5038 25.257 17.7266 26.8616 18.8599C27.1207 19.0429 27.4151 19.1433 27.7447 19.1612C27.8054 19.1644 27.8524 19.1413 27.8856 19.0919Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M61.5723 11.8415C61.0937 12.4209 61.2237 13.1205 61.7667 13.5882C62.3522 14.0911 63.0142 14.5186 63.4976 15.1697C64.1292 16.02 62.7214 17.7934 62.1615 18.3971C61.5201 19.0871 60.2168 18.583 59.46 18.402C58.1141 18.0801 57.1497 18.6024 56.3371 19.6264C54.8916 21.4484 53.3295 23.7259 51.0447 24.462C50.2074 24.7317 49.4535 24.7952 48.783 24.6527C48.4015 24.5717 47.8914 24.4021 47.2525 24.1438C45.7669 23.5449 44.2036 24.0976 42.9258 24.8944C42.8592 24.9365 42.7824 24.9584 42.7047 24.9576L40.8924 24.9467C40.8454 24.9467 40.83 24.9244 40.8462 24.8799C40.8697 24.8199 40.8993 24.7645 40.9349 24.7135C42.1933 22.9121 43.7663 21.429 45.4535 19.9908C46.8346 18.8138 48.4453 17.9307 50.26 18.2343C50.7884 18.323 51.2828 18.521 51.7869 18.7093C51.9853 18.7838 52.1893 18.8267 52.3991 18.838C54.1276 18.934 55.3507 18.0728 56.4597 16.8241C57.0768 16.1277 57.7101 15.3041 58.3595 14.3534C58.4883 14.164 58.5919 13.9789 58.6705 13.7983C59.0462 12.9327 59.4389 12.1508 59.8487 11.4528C60.7945 9.84293 61.9991 8.5991 63.4624 7.72129C64.409 7.15282 65.3508 7.06778 66.2877 7.4662C66.5307 7.56985 66.7643 7.64638 66.9886 7.69578C67.7235 7.85733 68.3466 7.12609 68.694 6.57341C68.9434 6.17662 69.2001 5.80331 69.4641 5.45348C69.52 5.37898 69.5921 5.32634 69.6803 5.29556C69.712 5.28455 69.7457 5.28016 69.7791 5.28266C69.8126 5.28515 69.8452 5.29449 69.8749 5.31009C69.9046 5.32569 69.9308 5.34721 69.9519 5.37334C69.9729 5.39946 69.9884 5.42963 69.9974 5.46198C70.0613 5.68872 70.0593 5.91465 69.9913 6.13977C69.5524 7.60144 68.8406 8.88414 67.8559 9.98788C67.1331 10.7981 66.0144 11.8415 64.8848 11.1248C64.7155 11.0171 64.5447 10.9212 64.3722 10.8369C63.3093 10.3195 62.2647 11.0021 61.5723 11.8415Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M47.2136 13.5554C47.2776 13.3424 47.3662 13.1481 47.4796 12.9724C47.657 12.6962 47.7728 12.7197 47.827 13.0428C47.8724 13.3084 47.8764 13.5882 47.8392 13.8821C47.6489 15.3835 47.0573 16.701 46.0645 17.8347C45.6515 18.3068 45.1543 18.5826 44.5729 18.6619C44.5251 18.6684 44.4874 18.6919 44.4599 18.7324C43.9995 19.4126 43.261 20.654 42.3111 20.6078C42.086 20.5965 41.8597 20.5783 41.6321 20.5532C40.9507 20.4779 40.3251 20.7378 39.8672 21.2492C39.2655 21.9229 38.6724 22.6376 38.0877 23.3931C37.9144 23.6158 37.6694 23.8567 37.3528 24.1158C36.6216 24.7122 35.7871 25.0426 34.8506 24.9783C33.2156 24.8641 32.3629 23.6883 31.9232 22.2173C31.5855 21.0884 31.4474 19.979 31.509 18.8891C31.6037 17.231 31.8503 15.3859 32.0495 13.6113C32.3564 10.8758 32.7026 8.13104 33.0881 5.37695C33.0945 5.32918 33.1217 5.30529 33.1695 5.30529L34.7097 5.30407C34.7583 5.30407 34.7797 5.32837 34.774 5.37695C34.6113 6.63698 34.436 7.92495 34.2481 9.24086C33.9347 11.4467 33.7768 13.5177 33.7744 15.4539C33.7719 17.4509 34.2505 19.4417 36.5208 19.8037C37.3589 19.9373 38.4059 19.8159 39.1724 19.3992C40.115 18.8866 41.0576 17.4448 42.1192 17.491C42.4269 17.5039 42.7371 17.5189 43.0497 17.5359C44.2194 17.5979 44.8741 16.4026 45.0843 15.392C45.0924 15.3523 45.1162 15.3325 45.1559 15.3325C45.7827 15.3373 46.3828 15.4782 46.7265 14.7907C46.9209 14.402 47.0832 13.9903 47.2136 13.5554Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M79.631 5.32958L79.6358 23.9859C79.6358 24.0239 79.6553 24.043 79.6942 24.043L98.2642 24.0551C98.316 24.0551 98.3419 24.0806 98.3419 24.1316L98.3346 28.7851C98.3346 28.8345 98.31 28.8592 98.2606 28.8592L74.8694 28.8555C74.8395 28.8555 74.8245 28.8409 74.8245 28.8118V5.37938C74.8245 5.36585 74.8299 5.35288 74.8394 5.34331C74.849 5.33374 74.862 5.32836 74.8755 5.32836L79.631 5.32958Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M10.2654 11.867C10.9116 10.1458 11.774 8.41608 12.8162 6.88923C12.8235 6.87828 12.8343 6.87021 12.8468 6.86643C12.8592 6.86265 12.8725 6.86342 12.8843 6.86858C13.9702 7.3334 14.8767 8.00188 15.6039 8.87402C16.3789 9.80447 16.2307 11.2378 15.6319 12.212C15.1266 13.0323 14.5464 13.7234 13.8912 14.2854C13.6872 14.4616 13.471 14.4421 13.2596 14.3061C12.368 13.7368 11.54 13.1303 10.7756 12.4865C10.5812 12.3229 10.4156 12.148 10.2788 11.9617C10.2569 11.9326 10.2525 11.901 10.2654 11.867Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M88.9561 20.1086C91.9293 20.1086 94.3396 17.6983 94.3396 14.7251C94.3396 11.7519 91.9293 9.34167 88.9561 9.34167C85.9829 9.34167 83.5726 11.7519 83.5726 14.7251C83.5726 17.6983 85.9829 20.1086 88.9561 20.1086Z",
                    fill: "#E30617"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M55.986 26.3545C56.5606 24.9843 57.2007 23.67 58.023 22.4396C58.0481 22.4023 58.0793 22.3967 58.1166 22.4226C58.8126 22.9036 59.5912 23.4757 60.0576 24.1693C60.3917 24.6673 60.4524 25.2916 60.2702 25.8735C59.9009 27.0533 59.3211 27.9295 58.5308 28.5021C58.249 28.7049 57.9708 28.4194 57.7631 28.2457C57.227 27.7971 56.7092 27.3671 56.2095 26.9558C56.0334 26.8112 55.8876 26.5889 55.986 26.3545Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M60.2544 26.3849C60.8083 24.9928 61.4776 23.6749 62.2854 22.4529C62.3145 22.4092 62.3506 22.4019 62.3935 22.4311C63.3798 23.0894 64.9115 24.1863 64.6151 25.5698C64.371 26.7092 63.7029 27.8546 62.8053 28.496C62.566 28.6672 62.4129 28.5373 62.2198 28.3842C61.5557 27.8562 60.9371 27.3408 60.3637 26.8379C60.3009 26.7828 60.2567 26.7097 60.2371 26.6285C60.2175 26.5474 60.2236 26.4623 60.2544 26.3849Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M65.6852 26.4079C66.2488 25.022 66.8987 23.7101 67.7344 22.4542C67.7635 22.4104 67.8 22.4035 67.8437 22.4335C69.0292 23.234 70.4031 24.2531 70.0192 25.7314C69.735 26.8286 69.1872 27.7251 68.3757 28.4207C68.1514 28.6134 67.93 28.6174 67.7113 28.4328C67.2044 28.0052 66.6991 27.5902 66.1954 27.1878C66.0095 27.0384 65.5723 26.6861 65.6852 26.4079Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M3.85675 40.0099C4.22359 39.5872 4.03774 39.0139 3.64783 38.6738C2.92712 38.0454 2.22382 37.415 1.53793 36.7825C0.202994 35.5521 0.63785 33.5515 2.41857 33.0935C3.33606 32.8571 4.41024 32.8761 5.64112 33.1506C5.6889 33.1612 5.71441 33.1907 5.71765 33.2393L5.82211 34.5269C5.82697 34.5908 5.79903 34.6123 5.7383 34.5913C5.3253 34.4439 4.89733 34.3402 4.45438 34.2803C3.87619 34.2025 3.03806 34.3094 2.75261 34.8609C2.37606 35.5885 3.30529 36.2396 3.82153 36.6538C4.37866 37.1024 4.88802 37.5692 5.3496 38.0543C5.79903 38.5272 5.99945 39.0552 5.95087 39.6382C5.8464 40.8809 4.84065 41.5757 3.65755 41.7154C2.69066 41.8287 1.66749 41.7336 0.588047 41.4299C0.549987 41.4194 0.529742 41.3943 0.527313 41.3546L0.434998 40.0197C0.430949 39.9589 0.457266 39.9391 0.513952 39.9601C0.90022 40.1067 1.27515 40.2253 1.63875 40.316C2.34569 40.4922 3.39153 40.548 3.85675 40.0099Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M47.0411 33.0996C46.8727 35.9857 46.7694 38.7985 46.7314 41.538C46.7306 41.5898 46.7046 41.6157 46.6536 41.6157L44.7891 41.6145C44.7805 41.6146 44.7721 41.6128 44.7642 41.6094C44.7564 41.606 44.7493 41.601 44.7435 41.5947C44.7377 41.5884 44.7332 41.581 44.7304 41.5729C44.7276 41.5648 44.7265 41.5563 44.7271 41.5477C44.9401 38.6754 45.0571 35.8752 45.0782 33.147C45.0782 33.0984 45.1025 33.0741 45.1511 33.0741L47.018 33.0753C47.0212 33.0753 47.0243 33.076 47.0272 33.0772C47.03 33.0784 47.0326 33.0802 47.0348 33.0825C47.037 33.0848 47.0386 33.0875 47.0397 33.0904C47.0408 33.0934 47.0413 33.0965 47.0411 33.0996Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M11.2748 38.3895C10.8213 38.6074 10.3027 38.79 9.71881 38.9374C9.07868 39.1001 8.1701 39.6188 8.63168 40.3756C8.98272 40.9537 10.0079 40.8019 10.5691 40.6306C10.5718 40.6299 10.5746 40.6299 10.5773 40.6306C10.58 40.6313 10.5825 40.6327 10.5845 40.6347C10.5865 40.6367 10.5879 40.6391 10.5886 40.6418C10.5893 40.6445 10.5893 40.6474 10.5885 40.6501L10.3395 41.6218C10.3347 41.6404 10.3229 41.6514 10.3043 41.6546C9.54876 41.7967 8.75072 41.8271 8.01583 41.6206C7.04895 41.3485 6.60316 40.1994 6.98092 39.3127C7.2846 38.5997 8.20289 38.1697 8.9232 37.9936C9.48519 37.8559 10.0423 37.7178 10.5946 37.5794C11.6635 37.3097 11.5627 36.1497 10.4464 36.1023C9.63258 36.0675 8.758 36.2238 7.8227 36.5712C7.81192 36.575 7.80033 36.576 7.78905 36.5741C7.77777 36.5722 7.76717 36.5674 7.75827 36.5602C7.74937 36.553 7.74246 36.5437 7.73822 36.533C7.73397 36.5224 7.73253 36.5109 7.73403 36.4995L7.86278 35.5606C7.86845 35.516 7.89275 35.4877 7.93566 35.4755C9.19286 35.1306 10.7367 34.9314 11.9927 35.297C12.8163 35.5375 13.196 36.1031 13.1321 36.9939C13.0187 38.5754 12.9446 40.0958 12.9098 41.555C12.909 41.5939 12.8891 41.6133 12.8503 41.6133L11.2129 41.6109C11.208 41.6109 11.2032 41.6099 11.1988 41.6081C11.1944 41.6062 11.1904 41.6035 11.1871 41.6001C11.1838 41.5966 11.1812 41.5926 11.1796 41.5882C11.178 41.5838 11.1773 41.5791 11.1776 41.5744L11.355 38.443C11.3582 38.3806 11.3315 38.3628 11.2748 38.3895Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M16.5089 36.1035C17.2466 35.1747 18.2297 34.8965 19.4581 35.269C19.8582 35.3897 20.1622 35.6768 20.3704 36.1302C20.4003 36.1967 20.4388 36.2015 20.4858 36.1448C20.7263 35.8545 20.9959 35.5326 21.3385 35.3784C22.6904 34.7686 24.7663 35.1063 24.6327 37.051C24.525 38.622 24.4569 40.1269 24.4286 41.5659C24.4283 41.577 24.4237 41.5875 24.4157 41.5952C24.4078 41.6029 24.3972 41.6073 24.3861 41.6073L22.7244 41.6157C22.6645 41.6157 22.637 41.5858 22.6418 41.5259C22.743 40.214 22.8159 38.9111 22.8605 37.617C22.909 36.1922 21.2911 36.146 20.7639 37.1882C20.6076 37.4984 20.5141 37.8519 20.4833 38.2487C20.3951 39.3856 20.3533 40.4824 20.3582 41.5392C20.359 41.5862 20.3359 41.6097 20.289 41.6097L18.6479 41.6145C18.5953 41.6145 18.571 41.5886 18.5751 41.5368C18.6512 40.4169 18.7131 39.3151 18.7609 38.2316C18.7901 37.5587 18.8775 36.6331 17.9774 36.4898C17.3446 36.389 16.7858 36.8542 16.6 37.4312C16.4858 37.7859 16.4125 38.1968 16.3801 38.6641C16.3129 39.6415 16.2793 40.5962 16.2793 41.5283C16.2785 41.5817 16.2514 41.6085 16.1979 41.6085L14.5848 41.6145C14.5322 41.6153 14.5075 41.589 14.5107 41.5356C14.6387 39.4747 14.7282 37.4089 14.7792 35.3383C14.78 35.2864 14.8067 35.2605 14.8593 35.2605L16.3643 35.2593C16.4154 35.2593 16.4409 35.2852 16.4409 35.3371L16.4348 36.078C16.434 36.1582 16.4587 36.1667 16.5089 36.1035Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M29.9712 38.4199C29.4618 38.628 28.8905 38.8195 28.2573 38.9945C27.999 39.0665 27.7576 39.1908 27.5333 39.3674C27.0547 39.7463 27.1628 40.4885 27.7435 40.6877C28.1937 40.8432 28.7132 40.8181 29.3019 40.6124C29.3028 40.6122 29.3037 40.6123 29.3046 40.6125C29.3055 40.6127 29.3063 40.6131 29.307 40.6137C29.3077 40.6143 29.3083 40.615 29.3086 40.6158C29.309 40.6167 29.3092 40.6176 29.3092 40.6185C29.2242 40.9659 29.1302 41.306 29.0274 41.6388C29.0217 41.6575 29.0092 41.6684 28.9897 41.6716C28.2597 41.7882 27.4386 41.8295 26.7341 41.6255C25.817 41.3594 25.4113 40.4156 25.6166 39.5338C25.8243 38.6422 26.9248 38.1527 27.7593 37.962C28.3261 37.8324 28.88 37.6907 29.4209 37.5368C29.7817 37.4348 30.14 37.102 30.0416 36.6878C29.8862 36.0367 28.963 36.0464 28.4285 36.1181C27.7945 36.2031 27.1305 36.3602 26.4365 36.5894C26.4351 36.5896 26.4337 36.5895 26.4324 36.5892C26.4311 36.5888 26.4299 36.5882 26.429 36.5874C26.428 36.5865 26.4273 36.5855 26.4269 36.5844C26.4265 36.5832 26.4265 36.5821 26.4268 36.5809C26.4656 36.2189 26.5264 35.8598 26.609 35.5035C26.6108 35.4957 26.6147 35.4885 26.6203 35.4828C26.6258 35.477 26.6328 35.4728 26.6405 35.4707C27.8491 35.1415 29.2922 34.9641 30.5336 35.2484C31.4859 35.4654 31.9224 36.0715 31.843 37.0668C31.7377 38.3762 31.6641 39.8682 31.6219 41.5429C31.6211 41.5866 31.5989 41.6085 31.5551 41.6085L29.9554 41.6145C29.9117 41.6145 29.891 41.5927 29.8934 41.5489L30.0635 38.4855C30.0676 38.4151 30.0368 38.3932 29.9712 38.4199Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M35.3121 36.1448C35.7701 35.6079 36.2875 35.2617 37.0078 35.1597C37.7472 35.0544 38.4047 35.1144 38.9805 35.3395C40.0725 35.7646 40.0968 36.7449 40.0385 37.7616C39.9648 39.0337 39.9117 40.295 39.8793 41.5453C39.8785 41.5882 39.8567 41.6097 39.8137 41.6097L38.1496 41.6133C38.1403 41.6133 38.1311 41.6115 38.1226 41.6078C38.1141 41.6041 38.1064 41.5987 38.1001 41.592C38.0938 41.5852 38.089 41.5773 38.0861 41.5686C38.0831 41.5599 38.082 41.5507 38.0828 41.5416C38.1865 40.2711 38.25 39.041 38.2735 37.8514C38.2881 37.0874 37.8168 36.5457 37.0516 36.5262C36.1462 36.5027 35.5518 36.9344 35.2684 37.8211C35.151 38.1895 35.072 38.7973 35.0315 39.6443C35.0032 40.2492 34.9781 40.8805 34.9562 41.538C34.9554 41.5858 34.9307 41.6101 34.8821 41.6109L33.229 41.6133C33.1812 41.6133 33.1593 41.5898 33.1634 41.5429C33.3472 39.3265 33.4614 37.2587 33.5059 35.3395C33.5067 35.286 33.5338 35.2593 33.5873 35.2593L35.1907 35.2605C35.2401 35.2605 35.264 35.2856 35.2623 35.3358L35.2308 36.112C35.2275 36.2019 35.2546 36.2128 35.3121 36.1448Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M50.4799 36.1958C50.7933 35.7464 51.1852 35.4464 51.6557 35.2958C53.0902 34.8354 55.3277 35.1136 55.2341 37.1372C55.1629 38.6661 55.0993 40.1525 55.0434 41.5963C55.0434 41.6011 55.0415 41.6058 55.0381 41.6092C55.0347 41.6126 55.03 41.6145 55.0252 41.6145L53.3283 41.6133C53.321 41.6133 53.3137 41.6119 53.307 41.609C53.3002 41.6061 53.2942 41.602 53.2892 41.5967C53.2841 41.5915 53.2803 41.5853 53.2778 41.5785C53.2754 41.5718 53.2744 41.5646 53.2749 41.5574C53.3599 40.265 53.4182 39.0281 53.4498 37.8466C53.4631 37.3789 53.2627 36.8736 52.7999 36.6708C51.9241 36.2857 50.9415 36.6526 50.5552 37.5271C50.4127 37.8494 50.3228 38.224 50.2855 38.6507C50.1989 39.6257 50.1471 40.5978 50.1301 41.5672C50.1301 41.5794 50.1252 41.5911 50.1165 41.5998C50.1079 41.6085 50.0961 41.6133 50.0839 41.6133H48.4003C48.3485 41.6133 48.325 41.5878 48.3299 41.5368C48.5202 39.4751 48.6332 37.4 48.6688 35.3116C48.6688 35.298 48.6743 35.285 48.6841 35.2755C48.6939 35.2659 48.7072 35.2605 48.721 35.2605H50.3499C50.4034 35.2605 50.4293 35.2873 50.4276 35.3407L50.4094 36.1728C50.407 36.2594 50.4305 36.2671 50.4799 36.1958Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M59.0203 40.2456C59.2936 39.9176 59.1017 39.4828 58.7968 39.2544C58.2793 38.8665 57.8101 38.4875 57.389 38.1175C56.8723 37.6648 56.6521 37.149 56.7282 36.57C56.9736 34.7115 59.7054 35.0638 60.9067 35.2994C60.9286 35.3043 60.9399 35.3176 60.9407 35.3395L61.0014 36.5481C61.0023 36.5643 60.995 36.57 60.9796 36.5651C60.3273 36.3562 59.5183 36.1946 58.8843 36.4266C58.5239 36.5578 58.4105 36.8121 58.5441 37.1894C58.583 37.3004 58.7146 37.4453 58.9389 37.6243C59.4794 38.0567 60.1123 38.4612 60.5471 39.0175C60.9565 39.5398 61.0318 40.2954 60.6662 40.8469C59.8402 42.0919 57.6793 41.8137 56.4488 41.5016C56.4059 41.491 56.3828 41.4643 56.3796 41.4214L56.28 40.2395C56.2751 40.182 56.2998 40.1622 56.3541 40.18C57.0331 40.3962 58.4676 40.9112 59.0203 40.2456Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M72.0818 35.9031C72.0648 36.0723 72.1077 36.0889 72.2105 35.9529C72.7264 35.267 73.4244 34.9978 74.3046 35.1451C74.3508 35.1532 74.3747 35.1808 74.3763 35.2277L74.4188 36.5578C74.4204 36.6137 74.3937 36.6352 74.3386 36.6222C72.9175 36.2821 72.1279 37.1421 72.038 38.4709C71.9676 39.5091 71.9445 40.5327 71.9688 41.5417C71.9696 41.5878 71.9469 41.6109 71.9008 41.6109L70.2415 41.6145C70.233 41.6146 70.2245 41.6128 70.2166 41.6094C70.2088 41.606 70.2017 41.601 70.1959 41.5947C70.1901 41.5884 70.1856 41.581 70.1828 41.5729C70.18 41.5648 70.1789 41.5563 70.1796 41.5477C70.3318 39.5378 70.4152 37.4623 70.4298 35.3213C70.4298 35.28 70.4509 35.2593 70.493 35.2593L72.0307 35.2605C72.0737 35.2605 72.0959 35.282 72.0976 35.3249C72.1057 35.5217 72.1004 35.7144 72.0818 35.9031Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 96,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M79.2168 38.4175C78.8062 38.5997 78.3657 38.7499 77.8952 38.8681C77.3875 38.9957 76.502 39.2933 76.4813 39.9225C76.4461 41.006 77.809 40.8226 78.5414 40.6282C78.5434 40.6277 78.5455 40.6278 78.5475 40.6284C78.5495 40.6289 78.5513 40.63 78.5527 40.6315C78.5542 40.6329 78.5553 40.6347 78.5558 40.6367C78.5564 40.6387 78.5565 40.6408 78.556 40.6428L78.2742 41.6364C78.2721 41.6447 78.2674 41.6522 78.2607 41.658C78.254 41.6638 78.2456 41.6677 78.2365 41.6692C76.8445 41.8891 75.0006 41.9316 74.8038 40.0962C74.7298 39.3941 75.1743 38.76 75.7683 38.4357C76.6392 37.9596 77.6948 37.815 78.658 37.5368C78.841 37.4842 78.9985 37.3866 79.1305 37.2441C79.4451 36.9028 79.2957 36.3708 78.8742 36.2141C77.9863 35.8837 76.5955 36.2845 75.6808 36.593C75.6797 36.5934 75.6785 36.5936 75.6773 36.5934C75.6761 36.5932 75.675 36.5927 75.674 36.592C75.6731 36.5913 75.6723 36.5903 75.6718 36.5892C75.6713 36.5882 75.6711 36.587 75.6711 36.5858C75.7019 36.223 75.7643 35.8549 75.8582 35.4816C75.8598 35.4743 75.8647 35.4695 75.8728 35.467C76.259 35.3585 76.7894 35.2601 77.464 35.1719C78.2487 35.069 78.9827 35.086 79.6662 35.2229C80.61 35.4111 81.1591 35.9578 81.0874 36.9611C80.9878 38.3669 80.9117 39.8937 80.859 41.5416C80.8574 41.5878 80.8335 41.6109 80.7874 41.6109L79.1998 41.6121C79.1512 41.6121 79.1285 41.5878 79.1317 41.5392L79.3067 38.4806C79.3107 38.4102 79.2807 38.3891 79.2168 38.4175Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M84.4752 36.0452C84.4703 36.1861 84.5132 36.2027 84.6039 36.095C84.9513 35.6836 85.3416 35.4095 85.7749 35.2727C86.3887 35.0791 87.0478 35.0548 87.7524 35.1998C88.8334 35.4233 89.3476 36.0966 89.295 37.2198C89.227 38.6685 89.1667 40.1091 89.114 41.5416C89.1124 41.5878 89.0889 41.6109 89.0436 41.6109L87.4013 41.6121C87.3543 41.6121 87.3325 41.5886 87.3357 41.5416C87.4078 40.5513 87.4637 39.5095 87.5033 38.4163C87.5301 37.6923 87.5556 37.0643 86.9519 36.7121C86.4429 36.4145 85.674 36.4631 85.1942 36.8226C84.4581 37.3729 84.361 38.2681 84.3051 39.156C84.2614 39.8573 84.2265 40.6517 84.2006 41.5392C84.199 41.5894 84.1731 41.6145 84.1229 41.6145L82.4782 41.6133C82.4248 41.6133 82.4005 41.587 82.4053 41.5344C82.5843 39.4346 82.696 37.3684 82.7406 35.3358C82.7422 35.2848 82.7681 35.2593 82.8183 35.2593L84.4217 35.2605C84.4768 35.2605 84.5035 35.2877 84.5019 35.3419L84.4752 36.0452Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M92.2576 38.1818C92.1847 38.8742 92.2698 39.7415 92.8929 40.1411C93.7007 40.6586 94.6226 40.4812 95.5142 40.231C95.5814 40.2124 95.6089 40.2375 95.5968 40.3063L95.3891 41.4955C95.3802 41.5465 95.3502 41.5773 95.2992 41.5878C94.6198 41.7263 93.9428 41.7822 93.2682 41.7554C91.8859 41.7008 90.8547 40.9307 90.5644 39.5629C90.1587 37.6632 90.8802 35.4597 93.0387 35.1682C93.8897 35.0532 94.7663 35.1087 95.6684 35.3346C95.713 35.346 95.7365 35.3747 95.7389 35.4209L95.8021 36.6137C95.8053 36.6696 95.7798 36.6894 95.7255 36.6732C95.3449 36.5606 94.9595 36.4781 94.5692 36.4254C93.3144 36.2554 92.3924 36.9174 92.2576 38.1818Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M98.4792 38.4807C98.3432 40.0537 99.4837 40.7837 100.911 40.5954C101.451 40.5242 101.994 40.4011 102.541 40.2262C102.542 40.226 102.543 40.226 102.544 40.2263C102.545 40.2266 102.546 40.2271 102.547 40.2278C102.548 40.2285 102.549 40.2294 102.549 40.2303C102.549 40.2313 102.55 40.2324 102.55 40.2334C102.505 40.6618 102.438 41.0833 102.349 41.4979C102.345 41.5157 102.335 41.5267 102.318 41.5307C101.063 41.8344 99.0562 41.9777 97.9508 41.2271C96.5539 40.2808 96.4228 38.1867 97.1589 36.7473C97.9994 35.1051 100.057 34.7734 101.643 35.3699C102.82 35.8132 103.249 37.0801 103.101 38.3227C103.095 38.377 103.064 38.4045 103.01 38.4053L98.5497 38.4151C98.5067 38.4159 98.4833 38.4377 98.4792 38.4807ZM100.488 36.1958C99.519 36.0343 98.6626 36.6198 98.5655 37.6194C98.5606 37.6713 98.5845 37.6976 98.6371 37.6984L101.401 37.7045C101.411 37.7046 101.421 37.7027 101.431 37.6988C101.441 37.6949 101.449 37.6891 101.457 37.6817C101.464 37.6744 101.47 37.6656 101.474 37.6559C101.478 37.6463 101.48 37.6359 101.479 37.6255C101.459 36.9392 101.247 36.3234 100.488 36.1958Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M66.8829 40.7181C66.7866 40.8379 66.6849 40.9558 66.578 41.0716C65.9671 41.7372 64.8823 41.8356 64.0199 41.7275C62.8623 41.5805 62.1663 40.8529 62.2501 39.6565C62.3643 38.0288 62.4364 36.5874 62.4664 35.3322C62.468 35.2844 62.4923 35.2605 62.5392 35.2605L64.1426 35.2593C64.2098 35.2593 64.2406 35.2925 64.2349 35.3589C64.1418 36.5606 64.062 37.7308 63.9956 38.8694C63.9483 39.6941 64.2969 40.3075 65.1702 40.3476C66.5622 40.412 66.9558 39.3783 67.036 38.2134C67.1048 37.2101 67.1445 36.2521 67.155 35.3395C67.1558 35.2893 67.1813 35.2642 67.2315 35.2642L68.9005 35.2593C68.9069 35.2593 68.9132 35.2606 68.9191 35.2631C68.9249 35.2657 68.9302 35.2694 68.9345 35.2741C68.9389 35.2788 68.9422 35.2843 68.9443 35.2903C68.9464 35.2964 68.9472 35.3028 68.9467 35.3091C68.7637 37.5919 68.658 39.6804 68.6296 41.5745C68.6296 41.5841 68.6258 41.5934 68.619 41.6002C68.6121 41.6071 68.6029 41.6109 68.5932 41.6109L67.0287 41.6121C66.9842 41.6121 66.9619 41.5894 66.9619 41.5441L66.9643 40.7473C66.9643 40.6606 66.9372 40.6509 66.8829 40.7181Z",
                    fill: "#14317A"
                }, void 0, false, {
                    fileName: "[project]/src/assets/icon/logo.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/assets/icon/logo.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false);
};
const __TURBOPACK__default__export__ = Main;
}),
"[project]/src/components/animate-ui/motion-effect.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MotionEffect",
    ()=>MotionEffect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$24_reac_75fc789dbc841edd0ff83a96fec58b61$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.24_reac_75fc789dbc841edd0ff83a96fec58b61/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$24_reac_75fc789dbc841edd0ff83a96fec58b61$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.24_reac_75fc789dbc841edd0ff83a96fec58b61/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$24_reac_75fc789dbc841edd0ff83a96fec58b61$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.24_reac_75fc789dbc841edd0ff83a96fec58b61/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
const MotionEffect = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ children, className, transition = {
    type: 'spring',
    stiffness: 200,
    damping: 20
}, delay = 0, inView = false, inViewMargin = '0px', inViewOnce = true, blur = false, slide = false, fade = false, zoom = false, ...props }, ref)=>{
    const localRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useImperativeHandle"](ref, ()=>localRef.current);
    const inViewResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$24_reac_75fc789dbc841edd0ff83a96fec58b61$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInView"])(localRef, {
        once: inViewOnce,
        margin: inViewMargin
    });
    const isInView = !inView || inViewResult;
    const hiddenVariant = {};
    const visibleVariant = {};
    if (slide) {
        const offset = typeof slide === 'boolean' ? 100 : slide.offset ?? 100;
        const direction = typeof slide === 'boolean' ? 'left' : slide.direction ?? 'left';
        const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
        hiddenVariant[axis] = direction === 'left' || direction === 'up' ? -offset : offset;
        visibleVariant[axis] = 0;
    }
    if (fade) {
        hiddenVariant.opacity = typeof fade === 'boolean' ? 0 : fade.initialOpacity ?? 0;
        visibleVariant.opacity = typeof fade === 'boolean' ? 1 : fade.opacity ?? 1;
    }
    if (zoom) {
        hiddenVariant.scale = typeof zoom === 'boolean' ? 0.5 : zoom.initialScale ?? 0.5;
        visibleVariant.scale = typeof zoom === 'boolean' ? 1 : zoom.scale ?? 1;
    }
    if (blur) {
        hiddenVariant.filter = typeof blur === 'boolean' ? 'blur(10px)' : `blur(${blur})`;
        visibleVariant.filter = 'blur(0px)';
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$24_reac_75fc789dbc841edd0ff83a96fec58b61$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$24_reac_75fc789dbc841edd0ff83a96fec58b61$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            ref: localRef,
            initial: "hidden",
            animate: isInView ? 'visible' : 'hidden',
            exit: "hidden",
            variants: {
                hidden: hiddenVariant,
                visible: visibleVariant
            },
            transition: {
                ...transition,
                delay: (transition?.delay ?? 0) + delay
            },
            className: className,
            ...props,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/animate-ui/motion-effect.tsx",
            lineNumber: 99,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/animate-ui/motion-effect.tsx",
        lineNumber: 98,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
MotionEffect.displayName = 'MotionEffect';
;
}),
"[project]/src/components/animate-ui/ripple-button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RippleButton",
    ()=>RippleButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$24_reac_75fc789dbc841edd0ff83a96fec58b61$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.24_reac_75fc789dbc841edd0ff83a96fec58b61/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const RippleButton = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ children, onClick, className, rippleClassName, scale = 10, transition = {
    duration: 0.6,
    ease: 'easeOut'
}, ...props }, ref)=>{
    const [ripples, setRipples] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]([]);
    const buttonRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useImperativeHandle"](ref, ()=>buttonRef.current);
    const createRipple = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((event)=>{
        const button = buttonRef.current;
        if (!button) return;
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const newRipple = {
            id: Date.now(),
            x,
            y
        };
        setRipples((prev)=>[
                ...prev,
                newRipple
            ]);
        setTimeout(()=>{
            setRipples((prev)=>prev.filter((r)=>r.id !== newRipple.id));
        }, 600);
    }, []);
    const handleClick = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((event)=>{
        createRipple(event);
        if (onClick) {
            onClick(event);
        }
    }, [
        createRipple,
        onClick
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$24_reac_75fc789dbc841edd0ff83a96fec58b61$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
        ref: buttonRef,
        onClick: handleClick,
        whileTap: {
            scale: 0.95
        },
        whileHover: {
            scale: 1.05
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative h-10 px-4 py-2 text-sm font-medium text-primary-foreground overflow-hidden bg-primary cursor-pointer rounded-lg focus:outline-none', className),
        ...props,
        children: [
            children,
            ripples.map((ripple)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$24_reac_75fc789dbc841edd0ff83a96fec58b61$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                    initial: {
                        scale: 0,
                        opacity: 0.5
                    },
                    animate: {
                        scale,
                        opacity: 0
                    },
                    transition: transition,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('absolute bg-primary-foreground rounded-full size-5 pointer-events-none', rippleClassName),
                    style: {
                        top: ripple.y - 10,
                        left: ripple.x - 10
                    }
                }, ripple.id, false, {
                    fileName: "[project]/src/components/animate-ui/ripple-button.tsx",
                    lineNumber: 89,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/animate-ui/ripple-button.tsx",
        lineNumber: 76,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
RippleButton.displayName = 'RippleButton';
;
}),
"[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-full px-3 py-2 rounded-md border border-border bg-gray-50 placeholder:text-placeholder placeholder:text-sm placeholder:font-normal focus:ring-0 focus:outline-none", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/components/ui/input-otp.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InputOTP",
    ()=>InputOTP,
    "InputOTPGroup",
    ()=>InputOTPGroup,
    "InputOTPSeparator",
    ()=>InputOTPSeparator,
    "InputOTPSlot",
    ()=>InputOTPSlot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$input$2d$otp$40$1$2e$4$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$input$2d$otp$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/input-otp@1.4.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/input-otp/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MinusIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/minus.js [app-ssr] (ecmascript) <export default as MinusIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function InputOTP({ className, containerClassName, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$input$2d$otp$40$1$2e$4$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$input$2d$otp$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OTPInput"], {
        "data-slot": "input-otp",
        containerClassName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 has-disabled:opacity-50", containerClassName),
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("disabled:cursor-not-allowed", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input-otp.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
function InputOTPGroup({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "input-otp-group",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input-otp.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
function InputOTPSlot({ index, className, ...props }) {
    const inputOTPContext = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$input$2d$otp$40$1$2e$4$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$input$2d$otp$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OTPInputContext"]);
    const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "input-otp-slot",
        "data-active": isActive,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]", className),
        ...props,
        children: [
            char,
            hasFakeCaret && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-caret-blink bg-foreground h-4 w-px duration-1000"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/input-otp.tsx",
                    lineNumber: 62,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/input-otp.tsx",
                lineNumber: 61,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/input-otp.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
function InputOTPSeparator({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "input-otp-separator",
        role: "separator",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MinusIcon$3e$__["MinusIcon"], {}, void 0, false, {
            fileName: "[project]/src/components/ui/input-otp.tsx",
            lineNumber: 72,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input-otp.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/lib/api-error-handler.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/app/(auth)/login/components/login-form.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoginForm",
    ()=>LoginForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$dd2c66__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:dd2c66 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$icon$2f$logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/assets/icon/logo.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$animate$2d$ui$2f$motion$2d$effect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/animate-ui/motion-effect.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$animate$2d$ui$2f$ripple$2d$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/animate-ui/ripple-button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2d$otp$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input-otp.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$hookform$2b$resolvers$40$5$2e$2$2e$2_r_77d67db0a4a57522e6e193e074b811b6$2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@hookform+resolvers@5.2.2_r_77d67db0a4a57522e6e193e074b811b6/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeftIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/phone.js [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$11_next$40$15$2e$5_e3b532296a39ef48a9442ac4fbf1f535$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@4.24.11_next@15.5_e3b532296a39ef48a9442ac4fbf1f535/node_modules/next-auth/react/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$google$2d$recaptcha$2d$v3$40$1_da2e4842bce133d9d4ef8e4b68c679ec$2f$node_modules$2f$react$2d$google$2d$recaptcha$2d$v3$2f$dist$2f$react$2d$google$2d$recaptcha$2d$v3$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-google-recaptcha-v3@1_da2e4842bce133d9d4ef8e4b68c679ec/node_modules/react-google-recaptcha-v3/dist/react-google-recaptcha-v3.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hook$2d$form$40$7$2e$65$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-hook-form@7.65.0_react@19.1.0/node_modules/react-hook-form/dist/index.esm.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/sonner@2.0.7_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.1.12/node_modules/zod/v4/classic/schemas.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-error-handler.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// Custom pattern for Persian/Arabic and English digits
const REGEXP_PERSIAN_ENGLISH_DIGITS = "[0-9۰-۹٠-٩]*";
// Enhanced Persian/Arabic to English number conversion specifically for OTP
const convertPersianToEnglishForOTP = (str)=>{
    if (!str) return str;
    // Persian digits: ۰۱۲۳۴۵۶۷۸۹ to 0123456789
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    // Arabic digits: ٠١٢٣٤٥٦٧٨٩ to 0123456789
    const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
    let result = str;
    // Convert Persian digits
    for(let i = 0; i < persianDigits.length; i++){
        result = result.replace(new RegExp(persianDigits[i], "g"), i.toString());
    }
    // Convert Arabic digits
    for(let i = 0; i < arabicDigits.length; i++){
        result = result.replace(new RegExp(arabicDigits[i], "g"), i.toString());
    }
    // Only keep English digits
    result = result.replace(/[^0-9]/g, "");
    return result;
};
// Add utility function to convert Persian numbers to English
const convertPersianToEnglish = (value)=>{
    const persianNumbers = [
        "۰",
        "۱",
        "۲",
        "۳",
        "۴",
        "۵",
        "۶",
        "۷",
        "۸",
        "۹"
    ];
    const arabicNumbers = [
        "٠",
        "١",
        "٢",
        "٣",
        "٤",
        "٥",
        "٦",
        "٧",
        "٨",
        "٩"
    ];
    return value.split("").map((char)=>{
        // Check Persian numbers
        const persianIndex = persianNumbers.indexOf(char);
        if (persianIndex !== -1) return persianIndex.toString();
        // Check Arabic numbers
        const arabicIndex = arabicNumbers.indexOf(char);
        if (arabicIndex !== -1) return arabicIndex.toString();
        // Return as is if not found
        return char;
    }).join("");
};
// Add utility function to format phone number display
const formatPhoneNumber = (value)=>{
    // Remove all non-digits
    const cleanValue = value.replace(/\D/g, "");
    // Format as 0XXX XXX XXXX
    if (cleanValue.length <= 4) {
        return cleanValue;
    } else if (cleanValue.length <= 7) {
        return `${cleanValue.slice(0, 4)} ${cleanValue.slice(4)}`;
    } else if (cleanValue.length <= 11) {
        return `${cleanValue.slice(0, 4)} ${cleanValue.slice(4, 7)} ${cleanValue.slice(7)}`;
    } else {
        return `${cleanValue.slice(0, 4)} ${cleanValue.slice(4, 7)} ${cleanValue.slice(7, 11)}`;
    }
};
const phoneSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
    phoneNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().refine((val)=>val.replace(/\D/g, "").trim().length === 11, {
        message: "شماره موبایل باید 11 رقم باشد"
    }).refine((val)=>val.replace(/\D/g, "").trim().startsWith("09"), {
        message: "شماره موبایل باید با 09 شروع شود"
    }).refine((val)=>val.replace(/\D/g, "").trim().length <= 11, {
        message: "شماره موبایل نمی‌تواند بیشتر از 11 رقم باشد"
    })
});
const otpSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
    otp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().length(6, "کد تایید باید ۶ رقم باشد")
});
function LoginForm({ callbackUrl = "/" }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const phoneInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { executeRecaptcha } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$google$2d$recaptcha$2d$v3$40$1_da2e4842bce133d9d4ef8e4b68c679ec$2f$node_modules$2f$react$2d$google$2d$recaptcha$2d$v3$2f$dist$2f$react$2d$google$2d$recaptcha$2d$v3$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGoogleReCaptcha"])();
    const [isRecaptchaLoaded, setIsRecaptchaLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("phone");
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSendingOtp, setIsSendingOtp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(180);
    const [canResend, setCanResend] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [savedPhoneNumber, setSavedPhoneNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isInputReady, setIsInputReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const firstOtpInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [hasAutoSubmitted, setHasAutoSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Toast management with consistent IDs
    const TOAST_IDS = {
        PHONE_SUBMIT: "phone-submit",
        OTP_SEND: "otp-send",
        OTP_VERIFY: "otp-verify",
        PASSWORD_LOGIN: "password-login",
        FORGOT_PASSWORD: "forgot-password",
        RESET_PASSWORD: "reset-password",
        GENERAL: "general"
    };
    // Track last shown toast to avoid duplicates and race conditions
    const activeToastsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    // Build a readable error message compatible with FastEndpoints/Ardalis/ProblemDetails
    const buildErrorMessageFromDetails = (details, fallback, errLike)=>{
        // Try to use our comprehensive API error handler first
        try {
            if (details) {
                const msg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["handleApiErrorWithCleanup"])(details, fallback);
                if (msg && msg.trim()) return msg;
            }
            if (errLike) {
                // If a string came from NextAuth (query param), clean it up
                if (typeof errLike === "string") {
                    const msg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cleanErrorMessage"])(errLike);
                    if (msg && msg.trim()) return msg;
                }
                // If it's an object, let the handler try
                if (typeof errLike === "object") {
                    const msg2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["handleApiErrorWithCleanup"])(errLike, fallback);
                    if (msg2 && msg2.trim()) return msg2;
                }
            }
        } catch  {}
        return fallback;
    };
    // Centralized toast management function
    const showToast = (type, message, id = TOAST_IDS.GENERAL)=>{
        console.log("📱 [TOAST] showToast called with:", {
            type,
            message,
            id
        });
        // Always dismiss any existing toast with the same ID first
        // toast.dismiss(id);
        console.log("📱 [TOAST] Dismissed existing toast with id:", id);
        // Small delay to ensure dismiss is processed
        setTimeout(()=>{
            // Idempotent toast path (prevents duplicates and flicker)
            {
                const last = activeToastsRef.current[id];
                if (last && last.type === type && last.message === message) {
                    return;
                }
                if (type === "loading") {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].loading(message, {
                        id,
                        duration: Infinity
                    });
                } else if (type === "success") {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(message, {
                        id,
                        duration: 6500
                    });
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(message, {
                        id,
                        duration: 6500
                    });
                }
                activeToastsRef.current[id] = {
                    type,
                    message
                };
                return;
            }
            //TURBOPACK unreachable
            ;
        }, 50);
    };
    // Add effect to track reCAPTCHA loading state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (executeRecaptcha) {
            setIsRecaptchaLoaded(true);
        }
    }, [
        executeRecaptcha
    ]);
    // Fast readiness: mark loaded as soon as grecaptcha badge or ready() is available
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isRecaptchaLoaded) return;
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const markLoadedOnce = undefined;
        const w = undefined;
        // Observe DOM for badge injection (most reliable visual signal)
        const observer = undefined;
        // Short polling for grecaptcha.ready appearance
        let tries;
        const interval = undefined;
    }, [
        executeRecaptcha,
        isRecaptchaLoaded
    ]);
    // reCAPTCHA function for OTP
    // const executeReCaptchaForOtp = useCallback(async (): Promise<
    //   string | null
    // > => {
    //   console.log("🔐 [reCAPTCHA] Starting execution for OTP action...");
    //   if (!executeRecaptcha) {
    //     console.warn(
    //       "⚠️ [reCAPTCHA] Execute recaptcha not yet available for otp"
    //     );
    //     return null;
    //   }
    //   try {
    //     console.log('🔐 [reCAPTCHA] Executing reCAPTCHA with action: "otp"');
    //     const token = await executeRecaptcha("otp");
    //     console.log(
    //       "✅ [reCAPTCHA] Token generated successfully for otp:",
    //       token
    //     );
    //     console.log("🔐 [reCAPTCHA] Token length:", token?.length || 0);
    //     return token;
    //   } catch (error) {
    //     console.error("❌ [reCAPTCHA] Error executing reCAPTCHA for otp:", error);
    //     return null;
    //   }
    // }, [executeRecaptcha]);
    const phoneForm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hook$2d$form$40$7$2e$65$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$hookform$2b$resolvers$40$5$2e$2$2e$2_r_77d67db0a4a57522e6e193e074b811b6$2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zodResolver"])(phoneSchema),
        defaultValues: {
            phoneNumber: ""
        }
    });
    const otpForm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$hook$2d$form$40$7$2e$65$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$hookform$2b$resolvers$40$5$2e$2$2e$2_r_77d67db0a4a57522e6e193e074b811b6$2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zodResolver"])(otpSchema),
        defaultValues: {
            otp: ""
        }
    });
    // Handle countdown timer for OTP resend
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let timer;
        if (step === "otp" && countdown > 0) {
            console.log("Starting countdown timer from", countdown);
            timer = setInterval(()=>{
                setCountdown((prev)=>{
                    const newValue = prev <= 1 ? 0 : prev - 1;
                    if (newValue === 0 && !canResend) {
                        console.log("Countdown reached zero, enabling resend");
                        setCanResend(true);
                    }
                    return newValue;
                });
            }, 1000);
        }
        return ()=>{
            if (timer) {
                console.log("Clearing countdown timer");
                clearInterval(timer);
            }
        };
    }, [
        step,
        countdown,
        canResend
    ]);
    // Reset countdown when step changes to OTP
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (step === "otp") {
            console.log("Resetting countdown for OTP step");
            // Don't reset countdown if we already have a valid countdown running
            // This prevents reset on component re-renders
            if (countdown === 0 || canResend) {
                setCountdown(180);
                setCanResend(false);
            }
        }
    }, [
        step
    ]);
    // On step change, dismiss only lingering loading toasts; keep success/error visible
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const entries = Object.entries(activeToastsRef.current || {});
        entries.forEach(([id, info])=>{
            if (info.type === "loading") {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].dismiss(id);
                delete activeToastsRef.current[id];
            }
        });
    }, [
        step
    ]);
    // Clean up toasts when step changes to prevent confusion
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        console.log("📱 [TOAST CLEANUP] Step changed to:", step);
        // Dismiss all existing toasts when step changes
        Object.values(TOAST_IDS).forEach((id)=>{
            console.log("📱 [TOAST CLEANUP] Dismissing toast with id:", id);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].dismiss(id);
        });
    }, [
        step
    ]);
    // New focus handling approach
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (step === "phone") {
            // Set input as ready after a short delay
            const readyTimer = setTimeout(()=>{
                setIsInputReady(true);
            }, 100);
            return ()=>{
                clearTimeout(readyTimer);
                setIsInputReady(false);
            };
        }
    }, [
        step
    ]);
    // Simplified focus handling
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEffect"])(()=>{
        if (step === "phone" && phoneInputRef.current) {
            const input = phoneInputRef.current;
            input.focus();
        }
    }, [
        step
    ]);
    const handleFocusClick = ()=>{
        if (phoneInputRef.current) {
            phoneInputRef.current.focus();
        }
    };
    const handlePhoneSubmit = async (data)=>{
        if (isSubmitting) {
            console.log("Preventing duplicate phone submit");
            return;
        }
        setIsSubmitting(true);
        setError("");
        try {
            // Remove any non-digit characters from phone number
            const cleanPhoneNumber = data.phoneNumber.replace(/\D/g, "").trim();
            console.log("Processing phone number:", cleanPhoneNumber);
            setSavedPhoneNumber(cleanPhoneNumber);
            console.log("📱 [PHONE SUBMIT] Sending OTP to phone number");
            // Show loading toast
            showToast("loading", "در حال ارسال کد تایید...", TOAST_IDS.PHONE_SUBMIT);
            // Get reCAPTCHA token
            // const recaptchaToken = await executeReCaptchaForOtp();
            // if (!recaptchaToken) {
            //   console.error("❌ [PHONE SUBMIT] reCAPTCHA execution failed, aborting");
            //   showToast(
            //     "error",
            //     "خطا در تایید امنیتی. لطفا دوباره تلاش کنید.",
            //     TOAST_IDS.PHONE_SUBMIT
            //   );
            //   return;
            // }
            // Send OTP code
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$dd2c66__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["resendCode"])(cleanPhoneNumber);
            // const result = await resendCode(cleanPhoneNumber, recaptchaToken);
            console.log("OTP send result:", result);
            if (result.success) {
                console.log("✅ [PHONE SUBMIT] OTP sent successfully");
                setStep("otp");
                showToast("success", "کد تایید به شماره شما ارسال شد", TOAST_IDS.PHONE_SUBMIT);
                setCountdown(180);
                setCanResend(false);
            } else {
                const msg = buildErrorMessageFromDetails(result?.details, "خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.", result.error);
                console.error("❌ [PHONE SUBMIT] OTP send failed:", msg);
                showToast("error", msg, TOAST_IDS.PHONE_SUBMIT);
            }
        } catch (err) {
            console.error("❌ [PHONE SUBMIT] Phone verification error:", err);
            showToast("error", "خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.", TOAST_IDS.PHONE_SUBMIT);
        } finally{
            setIsSubmitting(false);
        }
    };
    // A separate function to handle OTP sending safely
    const sendOtpCodeSafely = async (phoneNumber)=>{
        // Prevent duplicate calls
        if (isSendingOtp) {
            console.log("Preventing duplicate OTP send request");
            return;
        }
        setIsSendingOtp(true);
        setError(""); // Clear any previous errors
        console.log(`Starting OTP request for ${phoneNumber}`);
        try {
            // Show loading toast
            showToast("loading", "در حال ارسال کد تایید...", TOAST_IDS.OTP_SEND);
            // Get captcha token for otp action
            // const recaptchaToken = await executeReCaptchaForOtp();
            // if (!recaptchaToken) {
            //   console.warn("⚠️ [OTP SEND] Failed to get reCAPTCHA token");
            //   showToast(
            //     "error",
            //     "خطا در تایید امنیتی. لطفا دوباره تلاش کنید.",
            //     TOAST_IDS.OTP_SEND
            //   );
            //   return;
            // }
            const codeResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$dd2c66__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["resendCode"])(phoneNumber);
            // const codeResult = await resendCode(phoneNumber, recaptchaToken);
            console.log(`OTP request completed:`, codeResult);
            if (codeResult.success) {
                // Don't show success toast for resend to avoid confusion
                setCountdown(180);
                setCanResend(false);
                // Dismiss the loading toast
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].dismiss(TOAST_IDS.OTP_SEND);
            } else {
                showToast("error", (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cleanErrorMessage"])(codeResult.error ?? "") || "خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.", TOAST_IDS.OTP_SEND);
            }
        } catch (err) {
            console.error(`OTP request failed:`, err);
            showToast("error", "خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.", TOAST_IDS.OTP_SEND);
        } finally{
            console.log(`Finished OTP request`);
            setIsSendingOtp(false);
        }
    };
    const handleOtpSubmit = async (data)=>{
        if (isSubmitting) {
            console.log("Preventing duplicate OTP submit");
            return;
        }
        setIsSubmitting(true);
        setError("");
        console.log("Starting OTP verification");
        try {
            const otpCode = parseInt(data.otp);
            // Show login in progress
            showToast("loading", "در حال ورود...", TOAST_IDS.OTP_VERIFY);
            console.log("Attempting OTP login");
            // Get captcha token for otp action
            // const recaptchaToken = await executeReCaptchaForOtp();
            // if (!recaptchaToken) {
            //   console.warn("⚠️ [OTP VERIFY] Failed to get reCAPTCHA token");
            //   showToast(
            //     "error",
            //     "خطا در تایید امنیتی. لطفا دوباره تلاش کنید.",
            //     TOAST_IDS.OTP_VERIFY
            //   );
            //   return;
            // }
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$11_next$40$15$2e$5_e3b532296a39ef48a9442ac4fbf1f535$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signIn"])("otp-login", {
                phoneNumber: savedPhoneNumber,
                code: data.otp,
                // recaptchaToken,
                redirect: false,
                callbackUrl
            });
            //      const result = await signIn("otp-login", {
            //   phoneNumber: savedPhoneNumber,
            //   code: data.otp,
            //   recaptchaToken,
            //   redirect: false,
            //   callbackUrl,
            // });
            if (result?.error) {
                console.error("OTP login error:", result.error);
                // Use the specific error message from the backend
                const errorMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$error$2d$handler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cleanErrorMessage"])(result.error ?? "") || "کد تایید نامعتبر است. لطفا دوباره تلاش کنید.";
                showToast("error", errorMessage, TOAST_IDS.OTP_VERIFY);
                otpForm.reset();
            } else if (result?.ok) {
                // Success - redirect manually
                showToast("success", "ورود موفق. در حال انتقال...", TOAST_IDS.OTP_VERIFY);
                window.location.href = callbackUrl;
            }
        } catch (err) {
            console.error("OTP login exception:", err);
            const errorMessage = "خطا در ورود با کد یکبار مصرف. لطفا دوباره تلاش کنید.";
            showToast("error", errorMessage, TOAST_IDS.OTP_VERIFY);
            otpForm.reset();
        } finally{
            console.log("Finished OTP verification");
            setIsSubmitting(false);
        }
    };
    const handleResendCode = ()=>{
        if (!canResend || isSendingOtp) {
            console.log("Preventing resend: canResend =", canResend, "isSendingOtp =", isSendingOtp);
            return;
        }
        console.log("Resending code for phone:", savedPhoneNumber);
        // Send OTP code again
        sendOtpCodeSafely(savedPhoneNumber);
    };
    const handleBack = ()=>{
        // Clear any error messages
        setError("");
        if (step === "otp") {
            setStep("phone");
            // Reset OTP form
            otpForm.reset();
        }
    };
    // SMS autofill functionality for Android
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (step !== "otp") {
            return;
        }
        const isAndroid = /Android/i.test(navigator.userAgent);
        // For Android - Use WebOTP API
        if (isAndroid && "OTPCredential" in window) {
            const abortController = new AbortController();
            const retrieveOtp = async ()=>{
                try {
                    const otpCredential = await navigator.credentials.get({
                        otp: {
                            transport: [
                                "sms"
                            ]
                        },
                        signal: abortController.signal
                    });
                    if (otpCredential?.code) {
                        // Convert Persian/Arabic digits to English
                        const convertedCode = convertPersianToEnglishForOTP(otpCredential.code);
                        // Extract 6-digit code using multiple patterns
                        let extractedCode = "";
                        // Pattern 1: CODE: followed by digits
                        const codePattern = convertedCode.match(/CODE:?\s*(\d{6})/i);
                        if (codePattern) {
                            extractedCode = codePattern[1];
                        }
                        // Pattern 2: # followed by digits
                        if (!extractedCode) {
                            const hashPattern = convertedCode.match(/#(\d{6})/);
                            if (hashPattern) {
                                extractedCode = hashPattern[1];
                            }
                        }
                        // Pattern 3: Any 6-digit sequence
                        if (!extractedCode) {
                            const digitPattern = convertedCode.match(/\d{6}/);
                            if (digitPattern) {
                                extractedCode = digitPattern[0];
                            }
                        }
                        if (extractedCode && /^\d{6}$/.test(extractedCode)) {
                            otpForm.setValue("otp", extractedCode);
                            showToast("success", "کد تایید از پیامک خوانده شد.", TOAST_IDS.GENERAL);
                        }
                    }
                } catch (err) {
                    // Silently handle errors
                    console.log("WebOTP API error:", err);
                }
            };
            retrieveOtp();
            return ()=>{
                abortController.abort();
            };
        }
    }, [
        step,
        otpForm
    ]);
    // Auto-focus and setup OTP input attributes for mobile with Persian keyboard support
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (step === "otp") {
            const timer = setTimeout(()=>{
                // Try multiple selectors to find the actual input
                const otpInput = document.querySelector("[data-input-otp]") || document.querySelector('input[inputmode="numeric"]') || document.querySelector('input[type="text"]');
                if (otpInput) {
                    // Essential attributes for mobile keyboard with Persian support
                    otpInput.setAttribute("autocomplete", "one-time-code");
                    otpInput.setAttribute("inputmode", "text"); // Changed from "numeric" to support Persian keyboard
                    otpInput.setAttribute("pattern", "[0-9۰-۹٠-٩]{6}"); // Support Persian and Arabic digits
                    otpInput.setAttribute("type", "text"); // Changed from "tel" to "text" for better Persian support
                    // Force focus and keyboard open
                    otpInput.focus();
                    otpInput.click(); // Additional trigger for mobile
                    // Ensure cursor is at the end
                    if (otpInput.value) {
                        otpInput.setSelectionRange(otpInput.value.length, otpInput.value.length);
                    }
                }
                // Also try to find and configure all individual slots
                const otpSlots = document.querySelectorAll("[data-input-otp] input, input[data-otp-index]");
                otpSlots.forEach((slot)=>{
                    const inputSlot = slot;
                    inputSlot.setAttribute("inputmode", "text"); // Changed from "numeric" to support Persian keyboard
                    inputSlot.setAttribute("pattern", "[0-9۰-۹٠-٩]"); // Support Persian and Arabic digits
                    inputSlot.setAttribute("type", "text"); // Changed from "tel" to "text"
                    inputSlot.setAttribute("autocomplete", "one-time-code");
                });
            }, 150); // Increased delay to ensure DOM is ready
            return ()=>clearTimeout(timer);
        }
    }, [
        step
    ]);
    // OTP paste transformer to handle various OTP formats including Persian digits
    const handleOtpPaste = (pastedText)=>{
        // First convert Persian/Arabic digits to English
        const convertedText = convertPersianToEnglishForOTP(pastedText);
        // Clean up pasted text: remove spaces, dashes, and other separators
        const cleanText = convertedText.replace(/[\s\-\.\,\:]/g, "");
        // Extract only English digits
        const digits = cleanText.match(/\d/g);
        if (digits) {
            const result = digits.join("").slice(0, 6); // Take only first 6 digits
            return result;
        }
        const result = cleanText.slice(0, 6);
        return result;
    };
    // Auto-submit when OTP is complete
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (otpForm.watch("otp")?.length === 6 && step === "otp" && !isSubmitting && !hasAutoSubmitted) {
            setHasAutoSubmitted(true);
            setTimeout(()=>{
                otpForm.handleSubmit(handleOtpSubmit)();
            }, 300);
        } else if (otpForm.watch("otp")?.length < 6) {
            setHasAutoSubmitted(false);
        }
    }, [
        otpForm.watch("otp"),
        step,
        isSubmitting,
        hasAutoSubmitted,
        otpForm
    ]);
    // Convert Persian/Arabic digits to English in real-time
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const currentOtp = otpForm.watch("otp");
        if (currentOtp) {
            const convertedCode = convertPersianToEnglishForOTP(currentOtp);
            if (convertedCode !== currentOtp) {
                otpForm.setValue("otp", convertedCode);
            }
        }
    }, [
        otpForm.watch("otp"),
        otpForm
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-2xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl shadow-Card px-6 py-10 transition-all duration-300 overflow-hidden relative",
            children: [
                step !== "phone" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "absolute top-4 right-2 text-textBlack hover:text-textBlack/80 px-2",
                    onClick: handleBack,
                    disabled: isSubmitting || isSendingOtp,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                            className: "size-5",
                            strokeWidth: 2
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                            lineNumber: 890,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-normal ms-1",
                            children: "بازگشت"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                            lineNumber: 891,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                    lineNumber: 882,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$icon$2f$logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                            lineNumber: 897,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                        lineNumber: 896,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                    lineNumber: 895,
                    columnNumber: 9
                }, this),
                step === "phone" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$animate$2d$ui$2f$motion$2d$effect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MotionEffect"], {
                    slide: {
                        direction: "down"
                    },
                    fade: true,
                    inView: true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-right mt-16 mb-6 w-full font-bold text-2xl",
                                children: "ورود / ثبت نام"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                lineNumber: 904,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: phoneForm.handleSubmit(handlePhoneSubmit),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-normal mb-2 text-right",
                                                children: "سلام، برای ورود یا ثبت نام شماره موبایل خود را وارد کنید."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                lineNumber: 909,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                        ref: phoneInputRef,
                                                        type: "tel",
                                                        inputMode: "numeric",
                                                        pattern: "[0-9]*",
                                                        className: "pr-10 text-gray-500 text-left placeholder:text-right placeholder:dir-rtl text-base placeholder:font-medium",
                                                        dir: "ltr",
                                                        placeholder: "شماره موبایل",
                                                        value: phoneForm.watch("phoneNumber"),
                                                        onChange: (event)=>{
                                                            const convertedValue = convertPersianToEnglish(event.target.value);
                                                            const cleanedValue = convertedValue.replace(/\D/g, "").trim();
                                                            // Only take first 11 digits after cleaning
                                                            const finalValue = cleanedValue.substring(0, 11);
                                                            phoneForm.setValue("phoneNumber", finalValue);
                                                        },
                                                        onPaste: (event)=>{
                                                            event.preventDefault();
                                                            const pastedText = event.clipboardData.getData("text");
                                                            const convertedValue = convertPersianToEnglish(pastedText);
                                                            const cleanedValue = convertedValue.replace(/\D/g, "").trim();
                                                            // Only take first 11 digits after cleaning
                                                            const finalValue = cleanedValue.substring(0, 11);
                                                            phoneForm.setValue("phoneNumber", finalValue);
                                                        },
                                                        maxLength: 15,
                                                        disabled: isSubmitting,
                                                        autoComplete: "username",
                                                        name: "username"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                        lineNumber: 913,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                        className: "size-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                        lineNumber: 950,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                lineNumber: 912,
                                                columnNumber: 19
                                            }, this),
                                            phoneForm.formState.errors.phoneNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-500 text-sm select-none mt-2",
                                                children: phoneForm.formState.errors.phoneNumber.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                lineNumber: 953,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                        lineNumber: 908,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full justify-center flex mt-10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$animate$2d$ui$2f$ripple$2d$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RippleButton"], {
                                            type: "submit",
                                            className: "w-1/2 bg-primary hover:bg-primary text-white py-2 rounded-lg flex justify-center items-center",
                                            disabled: isSubmitting || !isRecaptchaLoaded,
                                            name: "submitPhonenumber",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-base font-normal",
                                                    children: isSubmitting ? "در حال پردازش..." : !isRecaptchaLoaded ? "در حال بارگذاری..." : "ارسال کد تایید"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                    lineNumber: 965,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftIcon$3e$__["ArrowLeftIcon"], {
                                                    className: "size-5 mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                    lineNumber: 972,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                            lineNumber: 959,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                        lineNumber: 958,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                lineNumber: 907,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                    lineNumber: 902,
                    columnNumber: 11
                }, this),
                step === "otp" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$animate$2d$ui$2f$motion$2d$effect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MotionEffect"], {
                    slide: {
                        direction: "down"
                    },
                    fade: true,
                    inView: true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center mb-6",
                                children: [
                                    "کد ارسال شده به شماره همراه ",
                                    savedPhoneNumber,
                                    " را وارد کنید."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                lineNumber: 983,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: otpForm.handleSubmit(handleOtpSubmit),
                                name: "otp-form",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                id: "otp-input",
                                                dir: "ltr",
                                                className: "flex justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2d$otp$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InputOTP"], {
                                                    maxLength: 6,
                                                    pattern: REGEXP_PERSIAN_ENGLISH_DIGITS,
                                                    containerClassName: "group flex items-center has-[:disabled]:opacity-30 justify-center",
                                                    value: otpForm.watch("otp") || "",
                                                    onChange: (value)=>{
                                                        // Convert Persian/Arabic numbers to English with enhanced function
                                                        const convertedValue = convertPersianToEnglishForOTP(value);
                                                        // Update form value with converted digits only
                                                        otpForm.setValue("otp", convertedValue);
                                                    },
                                                    onPaste: (e)=>{
                                                        e.preventDefault();
                                                        let paste = e.clipboardData?.getData("text")?.slice(0, 6) || "";
                                                        // Use enhanced conversion for paste
                                                        paste = convertPersianToEnglishForOTP(paste);
                                                        if (paste && /^\d{1,6}$/.test(paste)) {
                                                            otpForm.setValue("otp", paste);
                                                        }
                                                    },
                                                    disabled: isSubmitting,
                                                    autoFocus: true,
                                                    "data-testid": "otp-input",
                                                    inputMode: "text",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2d$otp$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InputOTPGroup"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2d$otp$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InputOTPSlot"], {
                                                                index: 0
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                                lineNumber: 1023,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                            lineNumber: 1022,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2d$otp$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InputOTPGroup"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2d$otp$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InputOTPSlot"], {
                                                                index: 1
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                                lineNumber: 1026,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                            lineNumber: 1025,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2d$otp$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InputOTPGroup"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2d$otp$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InputOTPSlot"], {
                                                                index: 2
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                                lineNumber: 1029,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                            lineNumber: 1028,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2d$otp$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InputOTPGroup"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2d$otp$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InputOTPSlot"], {
                                                                index: 3
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                                lineNumber: 1032,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                            lineNumber: 1031,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2d$otp$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InputOTPGroup"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2d$otp$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InputOTPSlot"], {
                                                                index: 4
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                                lineNumber: 1035,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                            lineNumber: 1034,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2d$otp$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InputOTPGroup"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2d$otp$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InputOTPSlot"], {
                                                                index: 5
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                                lineNumber: 1038,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                            lineNumber: 1037,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                    lineNumber: 992,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                lineNumber: 991,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-center text-gray-500 mt-2",
                                                children: "کد پیامکی به صورت خودکار تشخیص داده می‌شود"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                lineNumber: 1042,
                                                columnNumber: 19
                                            }, this),
                                            otpForm.formState.errors.otp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-500 text-sm text-center mt-1",
                                                children: otpForm.formState.errors.otp.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                lineNumber: 1046,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                        lineNumber: 990,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                type: "button",
                                                variant: "link",
                                                className: "text-primary text-sm font-medium",
                                                onClick: ()=>setStep("phone"),
                                                disabled: isSendingOtp || isSubmitting,
                                                children: "تغییر شماره موبایل"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                lineNumber: 1052,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mx-2 text-BlueGray",
                                                children: "|"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                lineNumber: 1061,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                type: "button",
                                                variant: "link",
                                                className: `text-mainOrange text-sm font-normal ${!canResend || isSendingOtp ? "opacity-50 cursor-not-allowed" : ""}`,
                                                onClick: handleResendCode,
                                                disabled: !canResend || isSendingOtp || isSubmitting,
                                                children: isSendingOtp ? "در حال ارسال کد..." : canResend ? "ارسال مجدد کد" : `ارسال مجدد کد (${countdown} ثانیه)`
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                                lineNumber: 1062,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                        lineNumber: 1051,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$animate$2d$ui$2f$ripple$2d$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RippleButton"], {
                                        type: "submit",
                                        className: "w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md",
                                        disabled: isSubmitting || isSendingOtp || otpForm.watch("otp")?.length !== 6,
                                        children: isSubmitting ? "در حال پردازش..." : "ورود"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                        lineNumber: 1080,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                                lineNumber: 986,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
                    lineNumber: 981,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
            lineNumber: 879,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(auth)/login/components/login-form.tsx",
        lineNumber: 877,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/(auth)/login/components/content.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$24_reac_75fc789dbc841edd0ff83a96fec58b61$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@12.23.24_reac_75fc789dbc841edd0ff83a96fec58b61/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$login$2f$components$2f$login$2d$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(auth)/login/components/login-form.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const LoginPageForm = (props)=>{
    const { callbackUrl } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-background min-h-screen relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:block hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$24_reac_75fc789dbc841edd0ff83a96fec58b61$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-10 -left-8",
                        animate: {
                            x: [
                                0,
                                30,
                                0
                            ],
                            y: [
                                0,
                                -15,
                                0
                            ]
                        },
                        transition: {
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/img/cloud.png",
                            className: "w-20",
                            alt: "Cloud"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$24_reac_75fc789dbc841edd0ff83a96fec58b61$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-20 right-1/12",
                        animate: {
                            x: [
                                0,
                                -25,
                                0
                            ],
                            y: [
                                0,
                                10,
                                0
                            ]
                        },
                        transition: {
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/img/fullCloud.png",
                            className: "w-32",
                            alt: "Full Cloud"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$24_reac_75fc789dbc841edd0ff83a96fec58b61$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute top-64 2xl:right-1/3 right-[40%]",
                        animate: {
                            x: [
                                0,
                                -25,
                                0
                            ],
                            y: [
                                0,
                                10,
                                0
                            ]
                        },
                        transition: {
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/img/fullCloud.png",
                            className: "w-32 scale-x-[-1]",
                            alt: "Cloud"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-[13%] top-1/5 z-10 w-full max-w-md",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$24_reac_75fc789dbc841edd0ff83a96fec58b61$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "text-center",
                            initial: {
                                opacity: 0,
                                y: 50
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$login$2f$components$2f$login$2d$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoginForm"], {
                                callbackUrl: callbackUrl
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$24_reac_75fc789dbc841edd0ff83a96fec58b61$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute bottom-0 left-0 w-full",
                        initial: {
                            y: 100,
                            opacity: 0
                        },
                        animate: {
                            y: 0,
                            opacity: 1
                        },
                        transition: {
                            duration: 0.5,
                            ease: "easeOut",
                            delay: 0.1
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/img/houses.png",
                            className: "w-full h-auto object-cover",
                            alt: "Houses"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$23$2e$24_reac_75fc789dbc841edd0ff83a96fec58b61$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute xl:bottom-[45%] lg:bottom-1/3 xl:left-1/5 lg:left-[17%]",
                        initial: {
                            scale: 1.2,
                            y: 150,
                            opacity: 0
                        },
                        animate: {
                            scale: [
                                1.2,
                                1.4,
                                1.6,
                                1.8,
                                2,
                                2.2,
                                2.4
                            ],
                            y: [
                                150,
                                100,
                                50,
                                0,
                                -50,
                                -100,
                                -150,
                                -200,
                                -250,
                                -300,
                                -350,
                                -400,
                                -450,
                                -500,
                                -550,
                                -600,
                                -650
                            ],
                            opacity: [
                                0,
                                0.3,
                                0.6,
                                1,
                                1,
                                1,
                                1,
                                1,
                                1,
                                1,
                                1,
                                1,
                                1,
                                1,
                                1
                            ]
                        },
                        transition: {
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/img/smoke.png",
                            className: "w-32 h-auto",
                            alt: "Smoke"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-0 right-0 w-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/img/smokeHousesMob.png",
                            className: "w-full"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-10 -right-7",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/img/fullCloud.png",
                            className: "w-32"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-1/3 -left-7",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/img/fullCloud.png",
                            className: "w-32"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(auth)/login/components/content.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(auth)/login/components/content.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = LoginPageForm;
}),
"[project]/src/app/(auth)/login/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Main
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useProtectedRoute$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useProtectedRoute.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$login$2f$components$2f$content$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(auth)/login/components/content.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Main() {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const redirectUrl = searchParams.get('redirectUrl') || searchParams.get('callbackUrl') || '/';
    // Use the protection hook but with redirectIfFound=true to handle redirecting authenticated users away
    const { isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useProtectedRoute$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProtectedRoute"])({
        redirectTo: redirectUrl,
        redirectIfFound: true
    });
    // Show loading state
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-[100dvh] w-full items-center justify-center"
        }, void 0, false, {
            fileName: "[project]/src/app/(auth)/login/page.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$login$2f$components$2f$content$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        callbackUrl: redirectUrl
    }, void 0, false, {
        fileName: "[project]/src/app/(auth)/login/page.tsx",
        lineNumber: 29,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=src_740e2d72._.js.map