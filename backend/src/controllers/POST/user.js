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
exports.PostUserController = void 0;
var validator_1 = __importDefault(require("validator"));
var users_1 = require("../../repositories/POST/users");
var helpers_1 = require("../helpers");
var users_2 = require("../../repositories/GET/users");
var bcrypt_1 = __importDefault(require("bcrypt"));
var PostUserController = /** @class */ (function () {
    function PostUserController() {
    }
    PostUserController.prototype.register = function (httpRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var requiredFields, _i, requiredFields_1, field, emailIsValid, searchUserWithEmail, isPhoneNumber, passwordScore, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        if (!((httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body) === undefined)) return [3 /*break*/, 1];
                        return [2 /*return*/, (0, helpers_1.voidRequest)('Please specify a body')];
                    case 1:
                        requiredFields = ['firstName', 'lastName', 'email', 'password'];
                        for (_i = 0, requiredFields_1 = requiredFields; _i < requiredFields_1.length; _i++) {
                            field = requiredFields_1[_i];
                            if (!(field in httpRequest.body)) {
                                return [2 /*return*/, (0, helpers_1.badRequest)("Field ".concat(field, " is required"))];
                            }
                        }
                        emailIsValid = validator_1.default.isEmail(httpRequest.body.email);
                        if (!emailIsValid) {
                            return [2 /*return*/, (0, helpers_1.badRequest)('Invalid e-mail adress')];
                        }
                        return [4 /*yield*/, new users_2.GetUsersRepository().getUsersByEmail(httpRequest.body.email)];
                    case 2:
                        searchUserWithEmail = _b.sent();
                        if (searchUserWithEmail.length > 0) {
                            return [2 /*return*/, (0, helpers_1.badRequest)('User with this e-mail already exists')];
                        }
                        if (httpRequest.body.phone !== undefined && httpRequest.body.phone !== null) {
                            isPhoneNumber = validator_1.default.isMobilePhone(httpRequest.body.phone);
                            if (!isPhoneNumber) {
                                return [2 /*return*/, (0, helpers_1.badRequest)('Invalid phone number')];
                            }
                        }
                        passwordScore = validator_1.default.isStrongPassword(httpRequest.body.password, {
                            minLength: 8,
                            returnScore: true,
                            pointsPerUnique: 0.5,
                            pointsPerRepeat: 0,
                            pointsForContainingLower: 1,
                            pointsForContainingUpper: 3,
                            pointsForContainingNumber: 1.5,
                            pointsForContainingSymbol: 4
                        });
                        if (passwordScore <= 13) {
                            return [2 /*return*/, (0, helpers_1.badRequest)('Password too weak')];
                        }
                        _a = httpRequest.body;
                        return [4 /*yield*/, bcrypt_1.default.hash(httpRequest.body.password, 10)];
                    case 3:
                        _a.password = _b.sent();
                        return [4 /*yield*/, new users_1.PostUserRepository().create(httpRequest.body)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, (0, helpers_1.successfull)('User created successfully')];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _b.sent();
                        return [2 /*return*/, (0, helpers_1.internalError)('REGISTER USER FAILED INTERNAL ERROR')];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return PostUserController;
}());
exports.PostUserController = PostUserController;
