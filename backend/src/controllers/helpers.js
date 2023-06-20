"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorizedError = exports.noContent = exports.successfull = exports.headersAuthError = exports.badPermission = exports.badResponse = exports.internalError = exports.badRequest = exports.voidRequest = void 0;
var protocols_1 = require("./protocols");
var voidRequest = function (message) { return ({
    statusCode: protocols_1.HTTPStatusCode.VOID_REQUEST,
    body: message
}); };
exports.voidRequest = voidRequest;
var badRequest = function (message) { return ({
    statusCode: protocols_1.HTTPStatusCode.BAD_REQUEST,
    body: message
}); };
exports.badRequest = badRequest;
var internalError = function (message) { return ({
    statusCode: protocols_1.HTTPStatusCode.INTERNAL_ERROR,
    body: message
}); };
exports.internalError = internalError;
var badResponse = function (message) { return ({
    statusCode: protocols_1.HTTPStatusCode.BAD_RESPONSE,
    body: message
}); };
exports.badResponse = badResponse;
var badPermission = function (message) { return ({
    statusCode: protocols_1.HTTPStatusCode.BAD_PERMISSION,
    body: message
}); };
exports.badPermission = badPermission;
var headersAuthError = function (message) { return ({
    statusCode: protocols_1.HTTPStatusCode.HEADERS_AUTH_ERROR,
    body: message
}); };
exports.headersAuthError = headersAuthError;
var successfull = function (message) { return ({
    statusCode: protocols_1.HTTPStatusCode.SUCCESSFULL,
    body: message
}); };
exports.successfull = successfull;
var noContent = function (message) { return ({
    statusCode: protocols_1.HTTPStatusCode.NOCONTENT,
    body: message
}); };
exports.noContent = noContent;
var unauthorizedError = function (message) { return ({
    statusCode: protocols_1.HTTPStatusCode.UNAUTHORIZED,
    body: message
}); };
exports.unauthorizedError = unauthorizedError;
