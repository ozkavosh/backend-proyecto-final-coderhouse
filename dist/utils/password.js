"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = exports.isValidPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const isValidPassword = (user, password) => {
    return bcrypt_1.default.compareSync(password, user.password);
};
exports.isValidPassword = isValidPassword;
const encryptPassword = (password) => {
    return bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10), null);
};
exports.encryptPassword = encryptPassword;
