"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5C%E5%B7%A5%E4%BD%9C%E6%96%87%E6%A1%A3%5Cxjbg%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5C%E5%B7%A5%E4%BD%9C%E6%96%87%E6%A1%A3%5Cxjbg&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5C%E5%B7%A5%E4%BD%9C%E6%96%87%E6%A1%A3%5Cxjbg%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5C%E5%B7%A5%E4%BD%9C%E6%96%87%E6%A1%A3%5Cxjbg&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Administrator_Desktop_xjbg_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Administrator\\\\Desktop\\\\工作文档\\\\xjbg\\\\src\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Administrator_Desktop_xjbg_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNBZG1pbmlzdHJhdG9yJTVDRGVza3RvcCU1QyVFNSVCNyVBNSVFNCVCRCU5QyVFNiU5NiU4NyVFNiVBMSVBMyU1Q3hqYmclNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q0FkbWluaXN0cmF0b3IlNUNEZXNrdG9wJTVDJUU1JUI3JUE1JUU0JUJEJTlDJUU2JTk2JTg3JUU2JUExJUEzJTVDeGpiZyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDMkM7QUFDeEg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaXR5cHVsc2UvPzMxMzUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcQWRtaW5pc3RyYXRvclxcXFxEZXNrdG9wXFxcXOW3peS9nOaWh+aho1xcXFx4amJnXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxBZG1pbmlzdHJhdG9yXFxcXERlc2t0b3BcXFxc5bel5L2c5paH5qGjXFxcXHhqYmdcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5C%E5%B7%A5%E4%BD%9C%E6%96%87%E6%A1%A3%5Cxjbg%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5C%E5%B7%A5%E4%BD%9C%E6%96%87%E6%A1%A3%5Cxjbg&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBaUM7QUFDUTtBQUV6QyxNQUFNRSxVQUFVRixnREFBUUEsQ0FBQ0Msa0RBQVdBO0FBQ08iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaXR5cHVsc2UvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHM/MDA5OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSBcIm5leHQtYXV0aFwiO1xyXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XHJcblxyXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpO1xyXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH07XHJcbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsImF1dGhPcHRpb25zIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var _auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @auth/prisma-adapter */ \"(rsc)/./node_modules/@auth/prisma-adapter/index.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./src/lib/db.ts\");\n\n\nconst authOptions = {\n    adapter: (0,_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_0__.PrismaAdapter)(_lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma),\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/auth/signin\",\n        error: \"/auth/signin\"\n    },\n    providers: [\n        // GitHub OAuth\n        ...process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? [\n            {\n                id: \"github\",\n                name: \"GitHub\",\n                type: \"oauth\",\n                authorization: \"https://github.com/login/oauth/authorize?scope=read:user user:email\",\n                token: \"https://github.com/login/oauth/access_token\",\n                userinfo: \"https://api.github.com/user\",\n                profile (profile) {\n                    return {\n                        id: String(profile.id),\n                        name: profile.login,\n                        email: profile.email,\n                        image: profile.avatar_url\n                    };\n                },\n                clientId: process.env.GITHUB_CLIENT_ID,\n                clientSecret: process.env.GITHUB_CLIENT_SECRET\n            }\n        ] : [],\n        // Google OAuth\n        ...process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [\n            {\n                id: \"google\",\n                name: \"Google\",\n                type: \"oauth\",\n                authorization: \"https://accounts.google.com/o/oauth2/v2/auth?scope=openid email profile\",\n                token: \"https://oauth2.googleapis.com/token\",\n                userinfo: \"https://openidconnect.googleapis.com/v1/userinfo\",\n                profile (profile) {\n                    return {\n                        id: profile.sub,\n                        name: profile.name,\n                        email: profile.email,\n                        image: profile.picture\n                    };\n                },\n                clientId: process.env.GOOGLE_CLIENT_ID,\n                clientSecret: process.env.GOOGLE_CLIENT_SECRET\n            }\n        ] : [],\n        // 开发用 Credential 登录\n        {\n            id: \"credentials\",\n            name: \"开发登录\",\n            type: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"邮箱\",\n                    type: \"email\",\n                    placeholder: \"dev@citypulse.app\"\n                },\n                password: {\n                    label: \"密码\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email) return null;\n                const user = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.user.upsert({\n                    where: {\n                        email: credentials.email\n                    },\n                    update: {},\n                    create: {\n                        email: credentials.email,\n                        name: credentials.email.split(\"@\")[0],\n                        image: \"/avatars/user1.jpg\",\n                        level: 12,\n                        title: \"City Explorer \\xb7 连接者\",\n                        totalDistance: 248,\n                        spotsExplored: 42,\n                        routesCreated: 8,\n                        experience: 880\n                    }\n                });\n                return {\n                    id: user.id,\n                    name: user.name,\n                    email: user.email,\n                    image: user.image\n                };\n            }\n        }\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user && token.id) {\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ3FEO0FBQ25CO0FBb0IzQixNQUFNRSxjQUErQjtJQUMxQ0MsU0FBU0gsbUVBQWFBLENBQUNDLDJDQUFNQTtJQUM3QkcsU0FBUztRQUFFQyxVQUFVO0lBQU07SUFDM0JDLE9BQU87UUFDTEMsUUFBUTtRQUNSQyxPQUFPO0lBQ1Q7SUFDQUMsV0FBVztRQUNULGVBQWU7V0FDWEMsUUFBUUMsR0FBRyxDQUFDQyxnQkFBZ0IsSUFBSUYsUUFBUUMsR0FBRyxDQUFDRSxvQkFBb0IsR0FDaEU7WUFDRTtnQkFDRUMsSUFBSTtnQkFDSkMsTUFBTTtnQkFDTkMsTUFBTTtnQkFDTkMsZUFBZTtnQkFDZkMsT0FBTztnQkFDUEMsVUFBVTtnQkFDVkMsU0FBUUEsT0FBMEU7b0JBQ2hGLE9BQU87d0JBQ0xOLElBQUlPLE9BQU9ELFFBQVFOLEVBQUU7d0JBQ3JCQyxNQUFNSyxRQUFRRSxLQUFLO3dCQUNuQkMsT0FBT0gsUUFBUUcsS0FBSzt3QkFDcEJDLE9BQU9KLFFBQVFLLFVBQVU7b0JBQzNCO2dCQUNGO2dCQUNBQyxVQUFVaEIsUUFBUUMsR0FBRyxDQUFDQyxnQkFBZ0I7Z0JBQ3RDZSxjQUFjakIsUUFBUUMsR0FBRyxDQUFDRSxvQkFBb0I7WUFDaEQ7U0FDRCxHQUNELEVBQUU7UUFDTixlQUFlO1dBQ1hILFFBQVFDLEdBQUcsQ0FBQ2lCLGdCQUFnQixJQUFJbEIsUUFBUUMsR0FBRyxDQUFDa0Isb0JBQW9CLEdBQ2hFO1lBQ0U7Z0JBQ0VmLElBQUk7Z0JBQ0pDLE1BQU07Z0JBQ05DLE1BQU07Z0JBQ05DLGVBQWU7Z0JBQ2ZDLE9BQU87Z0JBQ1BDLFVBQVU7Z0JBQ1ZDLFNBQVFBLE9BQXNFO29CQUM1RSxPQUFPO3dCQUNMTixJQUFJTSxRQUFRVSxHQUFHO3dCQUNmZixNQUFNSyxRQUFRTCxJQUFJO3dCQUNsQlEsT0FBT0gsUUFBUUcsS0FBSzt3QkFDcEJDLE9BQU9KLFFBQVFXLE9BQU87b0JBQ3hCO2dCQUNGO2dCQUNBTCxVQUFVaEIsUUFBUUMsR0FBRyxDQUFDaUIsZ0JBQWdCO2dCQUN0Q0QsY0FBY2pCLFFBQVFDLEdBQUcsQ0FBQ2tCLG9CQUFvQjtZQUNoRDtTQUNELEdBQ0QsRUFBRTtRQUNOLG9CQUFvQjtRQUNwQjtZQUNFZixJQUFJO1lBQ0pDLE1BQU07WUFDTkMsTUFBTTtZQUNOZ0IsYUFBYTtnQkFDWFQsT0FBTztvQkFBRVUsT0FBTztvQkFBTWpCLE1BQU07b0JBQVNrQixhQUFhO2dCQUFvQjtnQkFDdEVDLFVBQVU7b0JBQUVGLE9BQU87b0JBQU1qQixNQUFNO2dCQUFXO1lBQzVDO1lBQ0EsTUFBTW9CLFdBQVVKLFdBQVc7Z0JBQ3pCLElBQUksQ0FBQ0EsYUFBYVQsT0FBTyxPQUFPO2dCQUNoQyxNQUFNYyxPQUFPLE1BQU1wQywyQ0FBTUEsQ0FBQ29DLElBQUksQ0FBQ0MsTUFBTSxDQUFDO29CQUNwQ0MsT0FBTzt3QkFBRWhCLE9BQU9TLFlBQVlULEtBQUs7b0JBQUM7b0JBQ2xDaUIsUUFBUSxDQUFDO29CQUNUQyxRQUFRO3dCQUNObEIsT0FBT1MsWUFBWVQsS0FBSzt3QkFDeEJSLE1BQU1pQixZQUFZVCxLQUFLLENBQUNtQixLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ3JDbEIsT0FBTzt3QkFDUG1CLE9BQU87d0JBQ1BDLE9BQU87d0JBQ1BDLGVBQWU7d0JBQ2ZDLGVBQWU7d0JBQ2ZDLGVBQWU7d0JBQ2ZDLFlBQVk7b0JBQ2Q7Z0JBQ0Y7Z0JBQ0EsT0FBTztvQkFBRWxDLElBQUl1QixLQUFLdkIsRUFBRTtvQkFBRUMsTUFBTXNCLEtBQUt0QixJQUFJO29CQUFFUSxPQUFPYyxLQUFLZCxLQUFLO29CQUFFQyxPQUFPYSxLQUFLYixLQUFLO2dCQUFDO1lBQzlFO1FBQ0Y7S0FDRDtJQUNEeUIsV0FBVztRQUNULE1BQU1DLEtBQUksRUFBRWhDLEtBQUssRUFBRW1CLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSbkIsTUFBTUosRUFBRSxHQUFHdUIsS0FBS3ZCLEVBQUU7WUFDcEI7WUFDQSxPQUFPSTtRQUNUO1FBQ0EsTUFBTWQsU0FBUSxFQUFFQSxPQUFPLEVBQUVjLEtBQUssRUFBRTtZQUM5QixJQUFJZCxRQUFRaUMsSUFBSSxJQUFJbkIsTUFBTUosRUFBRSxFQUFFO2dCQUM1QlYsUUFBUWlDLElBQUksQ0FBQ3ZCLEVBQUUsR0FBR0ksTUFBTUosRUFBRTtZQUM1QjtZQUNBLE9BQU9WO1FBQ1Q7SUFDRjtBQUNGLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaXR5cHVsc2UvLi9zcmMvbGliL2F1dGgudHM/NjY5MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gXCJuZXh0LWF1dGhcIjtcclxuaW1wb3J0IHsgUHJpc21hQWRhcHRlciB9IGZyb20gXCJAYXV0aC9wcmlzbWEtYWRhcHRlclwiO1xyXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvZGJcIjtcclxuXHJcbi8vIOaJqeWxlSBOZXh0QXV0aCDnsbvlnotcclxuZGVjbGFyZSBtb2R1bGUgXCJuZXh0LWF1dGhcIiB7XHJcbiAgaW50ZXJmYWNlIFNlc3Npb24ge1xyXG4gICAgdXNlcjoge1xyXG4gICAgICBpZDogc3RyaW5nO1xyXG4gICAgICBuYW1lPzogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgZW1haWw/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICBpbWFnZT86IHN0cmluZyB8IG51bGw7XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG5cclxuZGVjbGFyZSBtb2R1bGUgXCJuZXh0LWF1dGgvand0XCIge1xyXG4gIGludGVyZmFjZSBKV1Qge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xyXG4gIGFkYXB0ZXI6IFByaXNtYUFkYXB0ZXIocHJpc21hKSBhcyBOZXh0QXV0aE9wdGlvbnNbXCJhZGFwdGVyXCJdLFxyXG4gIHNlc3Npb246IHsgc3RyYXRlZ3k6IFwiand0XCIgfSxcclxuICBwYWdlczoge1xyXG4gICAgc2lnbkluOiBcIi9hdXRoL3NpZ25pblwiLFxyXG4gICAgZXJyb3I6IFwiL2F1dGgvc2lnbmluXCIsXHJcbiAgfSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIC8vIEdpdEh1YiBPQXV0aFxyXG4gICAgLi4uKHByb2Nlc3MuZW52LkdJVEhVQl9DTElFTlRfSUQgJiYgcHJvY2Vzcy5lbnYuR0lUSFVCX0NMSUVOVF9TRUNSRVRcclxuICAgICAgPyBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiBcImdpdGh1YlwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkdpdEh1YlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIm9hdXRoXCIgYXMgY29uc3QsXHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb246IFwiaHR0cHM6Ly9naXRodWIuY29tL2xvZ2luL29hdXRoL2F1dGhvcml6ZT9zY29wZT1yZWFkOnVzZXIgdXNlcjplbWFpbFwiLFxyXG4gICAgICAgICAgICB0b2tlbjogXCJodHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgvYWNjZXNzX3Rva2VuXCIsXHJcbiAgICAgICAgICAgIHVzZXJpbmZvOiBcImh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlclwiLFxyXG4gICAgICAgICAgICBwcm9maWxlKHByb2ZpbGU6IHsgaWQ6IG51bWJlcjsgbG9naW46IHN0cmluZzsgYXZhdGFyX3VybDogc3RyaW5nOyBlbWFpbD86IHN0cmluZyB9KSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGlkOiBTdHJpbmcocHJvZmlsZS5pZCksXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBwcm9maWxlLmxvZ2luLFxyXG4gICAgICAgICAgICAgICAgZW1haWw6IHByb2ZpbGUuZW1haWwsXHJcbiAgICAgICAgICAgICAgICBpbWFnZTogcHJvZmlsZS5hdmF0YXJfdXJsLFxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5HSVRIVUJfQ0xJRU5UX0lELFxyXG4gICAgICAgICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52LkdJVEhVQl9DTElFTlRfU0VDUkVULFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdXHJcbiAgICAgIDogW10pLFxyXG4gICAgLy8gR29vZ2xlIE9BdXRoXHJcbiAgICAuLi4ocHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCAmJiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVFxyXG4gICAgICA/IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IFwiZ29vZ2xlXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiR29vZ2xlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwib2F1dGhcIiBhcyBjb25zdCxcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbjogXCJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvdjIvYXV0aD9zY29wZT1vcGVuaWQgZW1haWwgcHJvZmlsZVwiLFxyXG4gICAgICAgICAgICB0b2tlbjogXCJodHRwczovL29hdXRoMi5nb29nbGVhcGlzLmNvbS90b2tlblwiLFxyXG4gICAgICAgICAgICB1c2VyaW5mbzogXCJodHRwczovL29wZW5pZGNvbm5lY3QuZ29vZ2xlYXBpcy5jb20vdjEvdXNlcmluZm9cIixcclxuICAgICAgICAgICAgcHJvZmlsZShwcm9maWxlOiB7IHN1Yjogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGVtYWlsOiBzdHJpbmc7IHBpY3R1cmU6IHN0cmluZyB9KSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGlkOiBwcm9maWxlLnN1YixcclxuICAgICAgICAgICAgICAgIG5hbWU6IHByb2ZpbGUubmFtZSxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiBwcm9maWxlLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6IHByb2ZpbGUucGljdHVyZSxcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCxcclxuICAgICAgICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgICA6IFtdKSxcclxuICAgIC8vIOW8gOWPkeeUqCBDcmVkZW50aWFsIOeZu+W9lVxyXG4gICAge1xyXG4gICAgICBpZDogXCJjcmVkZW50aWFsc1wiLFxyXG4gICAgICBuYW1lOiBcIuW8gOWPkeeZu+W9lVwiLFxyXG4gICAgICB0eXBlOiBcImNyZWRlbnRpYWxzXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwi6YKu566xXCIsIHR5cGU6IFwiZW1haWxcIiwgcGxhY2Vob2xkZXI6IFwiZGV2QGNpdHlwdWxzZS5hcHBcIiB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIuWvhueggVwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSxcclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci51cHNlcnQoe1xyXG4gICAgICAgICAgd2hlcmU6IHsgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsIH0sXHJcbiAgICAgICAgICB1cGRhdGU6IHt9LFxyXG4gICAgICAgICAgY3JlYXRlOiB7XHJcbiAgICAgICAgICAgIGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCxcclxuICAgICAgICAgICAgbmFtZTogY3JlZGVudGlhbHMuZW1haWwuc3BsaXQoXCJAXCIpWzBdLFxyXG4gICAgICAgICAgICBpbWFnZTogXCIvYXZhdGFycy91c2VyMS5qcGdcIixcclxuICAgICAgICAgICAgbGV2ZWw6IDEyLFxyXG4gICAgICAgICAgICB0aXRsZTogXCJDaXR5IEV4cGxvcmVyIMK3IOi/nuaOpeiAhVwiLFxyXG4gICAgICAgICAgICB0b3RhbERpc3RhbmNlOiAyNDgsXHJcbiAgICAgICAgICAgIHNwb3RzRXhwbG9yZWQ6IDQyLFxyXG4gICAgICAgICAgICByb3V0ZXNDcmVhdGVkOiA4LFxyXG4gICAgICAgICAgICBleHBlcmllbmNlOiA4ODAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB7IGlkOiB1c2VyLmlkLCBuYW1lOiB1c2VyLm5hbWUsIGVtYWlsOiB1c2VyLmVtYWlsLCBpbWFnZTogdXNlci5pbWFnZSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG4gIGNhbGxiYWNrczoge1xyXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG9rZW47XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcclxuICAgICAgaWYgKHNlc3Npb24udXNlciAmJiB0b2tlbi5pZCkge1xyXG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzZXNzaW9uO1xyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG4iXSwibmFtZXMiOlsiUHJpc21hQWRhcHRlciIsInByaXNtYSIsImF1dGhPcHRpb25zIiwiYWRhcHRlciIsInNlc3Npb24iLCJzdHJhdGVneSIsInBhZ2VzIiwic2lnbkluIiwiZXJyb3IiLCJwcm92aWRlcnMiLCJwcm9jZXNzIiwiZW52IiwiR0lUSFVCX0NMSUVOVF9JRCIsIkdJVEhVQl9DTElFTlRfU0VDUkVUIiwiaWQiLCJuYW1lIiwidHlwZSIsImF1dGhvcml6YXRpb24iLCJ0b2tlbiIsInVzZXJpbmZvIiwicHJvZmlsZSIsIlN0cmluZyIsImxvZ2luIiwiZW1haWwiLCJpbWFnZSIsImF2YXRhcl91cmwiLCJjbGllbnRJZCIsImNsaWVudFNlY3JldCIsIkdPT0dMRV9DTElFTlRfSUQiLCJHT09HTEVfQ0xJRU5UX1NFQ1JFVCIsInN1YiIsInBpY3R1cmUiLCJjcmVkZW50aWFscyIsImxhYmVsIiwicGxhY2Vob2xkZXIiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInVzZXIiLCJ1cHNlcnQiLCJ3aGVyZSIsInVwZGF0ZSIsImNyZWF0ZSIsInNwbGl0IiwibGV2ZWwiLCJ0aXRsZSIsInRvdGFsRGlzdGFuY2UiLCJzcG90c0V4cGxvcmVkIiwicm91dGVzQ3JlYXRlZCIsImV4cGVyaWVuY2UiLCJjYWxsYmFja3MiLCJqd3QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/db.ts":
/*!***********************!*\
  !*** ./src/lib/db.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        \"query\",\n        \"error\",\n        \"warn\"\n    ] : 0\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2RiLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLFNBQ1hGLGdCQUFnQkUsTUFBTSxJQUN0QixJQUFJSCx3REFBWUEsQ0FBQztJQUNmSSxLQUNFQyxLQUFzQyxHQUNsQztRQUFDO1FBQVM7UUFBUztLQUFPLEdBQzFCLENBQVM7QUFDakIsR0FBRztBQUVMLElBQUlBLElBQXFDLEVBQUVKLGdCQUFnQkUsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NpdHlwdWxzZS8uL3NyYy9saWIvZGIudHM/OWU0ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcclxuXHJcbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7XHJcbiAgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcHJpc21hID1cclxuICBnbG9iYWxGb3JQcmlzbWEucHJpc21hID8/XHJcbiAgbmV3IFByaXNtYUNsaWVudCh7XHJcbiAgICBsb2c6XHJcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCJcclxuICAgICAgICA/IFtcInF1ZXJ5XCIsIFwiZXJyb3JcIiwgXCJ3YXJuXCJdXHJcbiAgICAgICAgOiBbXCJlcnJvclwiXSxcclxuICB9KTtcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWE7XHJcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwibG9nIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/@auth","vendor-chunks/preact","vendor-chunks/oidc-token-hash","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5C%E5%B7%A5%E4%BD%9C%E6%96%87%E6%A1%A3%5Cxjbg%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAdministrator%5CDesktop%5C%E5%B7%A5%E4%BD%9C%E6%96%87%E6%A1%A3%5Cxjbg&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();