(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/flowbite-react-icons@1.3.1__bf3eaa41f807671fda7e6d3e26bd79d3/node_modules/flowbite-react-icons/dist/esm/store/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
function setStore() {
    let data = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
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
"[project]/node_modules/.pnpm/flowbite-react-icons@1.3.1__bf3eaa41f807671fda7e6d3e26bd79d3/node_modules/flowbite-react-icons/dist/esm/components/base-icon.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseIcon",
    ()=>BaseIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$flowbite$2d$react$2d$icons$40$1$2e$3$2e$1_$5f$bf3eaa41f807671fda7e6d3e26bd79d3$2f$node_modules$2f$flowbite$2d$react$2d$icons$2f$dist$2f$esm$2f$store$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/flowbite-react-icons@1.3.1__bf3eaa41f807671fda7e6d3e26bd79d3/node_modules/flowbite-react-icons/dist/esm/store/index.mjs [app-client] (ecmascript)");
;
;
;
const BaseIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>{
    const { width, height, // custom
    size, // rest
    ...otherProps } = props;
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$flowbite$2d$react$2d$icons$40$1$2e$3$2e$1_$5f$bf3eaa41f807671fda7e6d3e26bd79d3$2f$node_modules$2f$flowbite$2d$react$2d$icons$2f$dist$2f$esm$2f$store$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStore"])();
    const mergedProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BaseIcon.useMemo[mergedProps]": ()=>{
            const _props = {
                ...otherProps
            };
            for(const _key in theme){
                const key = _key;
                if (key === "size") continue;
                var _props_key;
                _props[key] = (_props_key = _props[key]) !== null && _props_key !== void 0 ? _props_key : theme[key];
            }
            return _props;
        }
    }["BaseIcon.useMemo[mergedProps]"], [
        otherProps,
        theme
    ]);
    var _ref, _ref1, _ref2, _ref3;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ref,
        width: (_ref1 = (_ref = width !== null && width !== void 0 ? width : size) !== null && _ref !== void 0 ? _ref : theme.width) !== null && _ref1 !== void 0 ? _ref1 : theme.size,
        height: (_ref3 = (_ref2 = height !== null && height !== void 0 ? height : size) !== null && _ref2 !== void 0 ? _ref2 : theme.height) !== null && _ref3 !== void 0 ? _ref3 : theme.size,
        ...mergedProps
    });
});
;
 //# sourceMappingURL=base-icon.mjs.map
}),
]);

//# sourceMappingURL=f5180_flowbite-react-icons_dist_esm_ad82485f._.js.map