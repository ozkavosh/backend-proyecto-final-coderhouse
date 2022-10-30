"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidRegisterUser = exports.isValidLoginUser = void 0;
const yup = __importStar(require("yup"));
const loginUserSchema = yup.object().shape({
    email: yup.string().required("User email is required").email("User email does not match an email format"),
    password: yup.string().required("User password is required").min(4, "User password must be at least 4 characters long"),
}).noUnknown(true, "Unknown params found in user").strict(true);
const registerUserSchema = yup.object().shape({
    email: yup.string().required("User email is required").email("User email does not match an email format"),
    password: yup.string().required("User password is required").min(4, "User password must be at least 4 characters long"),
    name: yup.string().required("User name is required").matches(/^[a-zA-Z]+( [a-zA-Z]+)*$/, "User name may only have words and spaces between them"),
    cellphone: yup.number().required("User phone number is required")
}).noUnknown(true, "Unknown params found in user").strict(true);
const isValidLoginUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield loginUserSchema.validate(user, { abortEarly: false });
});
exports.isValidLoginUser = isValidLoginUser;
const isValidRegisterUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield registerUserSchema.validate(user, { abortEarly: false });
});
exports.isValidRegisterUser = isValidRegisterUser;
