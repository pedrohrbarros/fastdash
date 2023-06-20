"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserController = void 0;
var users_1 = require("../../repositories/GET/users");
var helpers_1 = require("../helpers");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var getUserFromToken_1 = require("../../tools/getUserFromToken");
var GetUserController = /** @class */ (function () {
    function GetUserController() {
    }
    GetUserController.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new users_1.GetUsersRepository().getList()];
                    case 1:
                        users = _a.sent();
                        if (users.length === 0) {
                            return [2 /*return*/, (0, helpers_1.noContent)('No users were found')];
                        }
                        else {
                            return [2 /*return*/, (0, helpers_1.successfull)(users)];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, (0, helpers_1.internalError)('GET LIST USERS FAILED INTERNAL ERROR')];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GetUserController.prototype.login = function (httpRequest) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var users, verifyPass, token, error_2;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 7, , 8]);
                        if (!(((_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body) === null || _a === void 0 ? void 0 : _a.email) === undefined && ((_b = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body) === null || _b === void 0 ? void 0 : _b.password) === undefined)) return [3 /*break*/, 1];
                        return [2 /*return*/, (0, helpers_1.badRequest)('Please provida a valid e-mail adress and password')];
                    case 1: return [4 /*yield*/, new users_1.GetUsersRepository().getUsersByEmail((_c = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body) === null || _c === void 0 ? void 0 : _c.email)];
                    case 2:
                        users = _f.sent();
                        if (!(users.length > 1)) return [3 /*break*/, 3];
                        return [2 /*return*/, (0, helpers_1.badResponse)('More than one user was found')];
                    case 3:
                        if (!(users.length === 0)) return [3 /*break*/, 4];
                        return [2 /*return*/, (0, helpers_1.badRequest)('No users found with this e-mail adress')];
                    case 4: return [4 /*yield*/, bcrypt_1.default.compare((_d = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body) === null || _d === void 0 ? void 0 : _d.password, users[0].password)];
                    case 5:
                        verifyPass = _f.sent();
                        if (!verifyPass) {
                            return [2 /*return*/, (0, helpers_1.badRequest)('Wrong password')];
                        }
                        else {
                            token = jsonwebtoken_1.default.sign({ id: users[0].id }, (_e = process.env.JWT_PASSWORD) !== null && _e !== void 0 ? _e : '', { expiresIn: '8h' });
                            return [2 /*return*/, (0, helpers_1.successfull)(token)];
                        }
                        _f.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_2 = _f.sent();
                        return [2 /*return*/, (0, helpers_1.internalError)('LOGIN USER FAILED INTERNAL ERROR')];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    GetUserController.prototype.getProfile = function (httpRequest) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, user, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        if (!(((_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.headers) === null || _a === void 0 ? void 0 : _a.authorization) === undefined)) return [3 /*break*/, 1];
                        return [2 /*return*/, (0, helpers_1.badRequest)('User not authenticated')];
                    case 1: return [4 /*yield*/, (0, getUserFromToken_1.getIDFromToken)(httpRequest.headers.authorization)];
                    case 2:
                        id = _b.sent();
                        return [4 /*yield*/, new users_1.GetUsersRepository().getUserByID(id)];
                    case 3:
                        user = _b.sent();
                        if (user === undefined || user === null) {
                            return [2 /*return*/, (0, helpers_1.badRequest)('User does not exist')];
                        }
                        else {
                            return [2 /*return*/, (0, helpers_1.successfull)(user)];
                        }
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_3 = _b.sent();
                        return [2 /*return*/, (0, helpers_1.internalError)('GET PROFILE FAILED INTERNAL ERROR')];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return GetUserController;
}());
exports.GetUserController = GetUserController;
