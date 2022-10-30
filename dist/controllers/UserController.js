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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema_1 = require("../utils/yup-schemas/userSchema");
const password_1 = require("../utils/password");
const generateAccessToken_1 = __importDefault(require("../utils/generateAccessToken"));
class UserController {
    constructor(service) {
        this.service = service;
    }
    postUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            if (user) {
                const newUser = yield this.service.save(user);
                if (!("errors" in newUser)) {
                    return res.json(newUser);
                }
                else {
                    return res.status(402).json(newUser);
                }
            }
            return res.status(402).json({ error: "Missing request body" });
        });
    }
    postLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                yield (0, userSchema_1.isValidLoginUser)(user);
                const userResult = yield this.service.getByEmail(user.email);
                if ("errors" in userResult || !(0, password_1.isValidPassword)(userResult, user.password))
                    throw { errors: ["Wrong credentials"] };
                delete userResult.password;
                const token = (0, generateAccessToken_1.default)(userResult);
                res.json({ token });
            }
            catch (e) {
                return res.status(400).json({ errors: e.errors.join(" - ") });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.service.getAll();
            if (users) {
                return res.json(users);
            }
            return res.status(500).json({ error: "Server error" });
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const user = id.includes("@")
                    ? yield this.service.getByEmail(id)
                    : yield this.service.getById(id);
                if (!("errors" in user)) {
                    return res.json(user);
                }
                else {
                    return res.status(402).json(user);
                }
            }
            return res.status(402).json({ error: "Missing user id" });
        });
    }
    putUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = req.body;
            if (user && id) {
                const newUser = yield this.service.update(id, user);
                if (!("errors" in newUser)) {
                    return res.json(newUser);
                }
                else {
                    return res.status(402).json(newUser);
                }
            }
            return res.status(402).json({ error: "Missing request body or user id" });
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const deleteResult = yield this.service.deleteById(id);
                if (!("errors" in deleteResult)) {
                    return res.json(deleteResult);
                }
                else {
                    return res.status(402).json(deleteResult);
                }
            }
            return res.status(402).json({ error: "Missing user id" });
        });
    }
    deleteUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield this.service.deleteAll());
        });
    }
}
exports.default = UserController;
