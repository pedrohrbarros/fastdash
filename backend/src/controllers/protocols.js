"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPStatusCode = void 0;
var HTTPStatusCode;
(function (HTTPStatusCode) {
    HTTPStatusCode[HTTPStatusCode["VOID_REQUEST"] = 404] = "VOID_REQUEST";
    HTTPStatusCode[HTTPStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTPStatusCode[HTTPStatusCode["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
    HTTPStatusCode[HTTPStatusCode["BAD_RESPONSE"] = 502] = "BAD_RESPONSE";
    HTTPStatusCode[HTTPStatusCode["BAD_PERMISSION"] = 403] = "BAD_PERMISSION";
    HTTPStatusCode[HTTPStatusCode["HEADERS_AUTH_ERROR"] = 401] = "HEADERS_AUTH_ERROR";
    HTTPStatusCode[HTTPStatusCode["SUCCESSFULL"] = 200] = "SUCCESSFULL";
    HTTPStatusCode[HTTPStatusCode["NOCONTENT"] = 204] = "NOCONTENT";
    HTTPStatusCode[HTTPStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
})(HTTPStatusCode = exports.HTTPStatusCode || (exports.HTTPStatusCode = {}));
