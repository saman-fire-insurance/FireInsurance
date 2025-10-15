module.exports = [
"[project]/node_modules/.pnpm/flowbite-react-icons@1.3.1__bf3eaa41f807671fda7e6d3e26bd79d3/node_modules/flowbite-react-icons/dist/esm/store/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStore",
    ()=>getStore,
    "setStore",
    ()=>setStore
]);
const store = {
    data: {
        size: 24,
        strokeWidth: 2,
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg"
    }
};
function setStore(data = {}, options = {}) {
    store.data = options.override ? data : {
        ...store.data,
        ...data
    };
}
function getStore() {
    return {
        ...store.data
    };
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/node_modules/.pnpm/flowbite-react-icons@1.3.1__bf3eaa41f807671fda7e6d3e26bd79d3/node_modules/flowbite-react-icons/dist/esm/components/base-icon.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseIcon",
    ()=>BaseIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$flowbite$2d$react$2d$icons$40$1$2e$3$2e$1_$5f$bf3eaa41f807671fda7e6d3e26bd79d3$2f$node_modules$2f$flowbite$2d$react$2d$icons$2f$dist$2f$esm$2f$store$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/flowbite-react-icons@1.3.1__bf3eaa41f807671fda7e6d3e26bd79d3/node_modules/flowbite-react-icons/dist/esm/store/index.mjs [app-ssr] (ecmascript)");
;
;
;
const BaseIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>{
    const { width, height, // custom
    size, // rest
    ...otherProps } = props;
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$flowbite$2d$react$2d$icons$40$1$2e$3$2e$1_$5f$bf3eaa41f807671fda7e6d3e26bd79d3$2f$node_modules$2f$flowbite$2d$react$2d$icons$2f$dist$2f$esm$2f$store$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStore"])();
    const mergedProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const _props = {
            ...otherProps
        };
        for(const _key in theme){
            const key = _key;
            if (key === "size") continue;
            _props[key] = _props[key] ?? theme[key];
        }
        return _props;
    }, [
        otherProps,
        theme
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ref,
        width: width ?? size ?? theme.width ?? theme.size,
        height: height ?? size ?? theme.height ?? theme.size,
        ...mergedProps
    });
});
;
 //# sourceMappingURL=base-icon.mjs.map
}),
];

//# sourceMappingURL=f5180_flowbite-react-icons_dist_esm_ea9a068e._.js.map