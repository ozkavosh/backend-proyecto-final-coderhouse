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
const messageSchema_1 = require("../utils/yup-schemas/messageSchema");
const logger_1 = __importDefault(require("../utils/logger"));
let instance = null;
class MessageService {
    constructor(repository) {
        this.repository = repository;
    }
    save(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, messageSchema_1.isValidMessage)(object);
                return yield this.repository.save(object);
            }
            catch (e) {
                logger_1.default.debug("Errors saving message: " + e.errors.join(" - "));
                return { errors: e.errors.join(" - ") };
            }
        });
    }
    static getInstance(repository) {
        if (!instance) {
            instance = new MessageService(repository);
            return instance;
        }
        return instance;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getAll();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof id !== "string")
                return { errors: "Message id must be a string" };
            return yield this.repository.getById(id);
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof email !== "string")
                return { errors: "Message owner email must be a string" };
            return yield this.repository.getByEmail(email);
        });
    }
    update(id, object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, messageSchema_1.isValidUpdatedMessage)(object);
                return yield this.repository.update(id, object);
            }
            catch (e) {
                logger_1.default.debug("Errors updating message: " + e.errors.join(" - "));
                return { errors: e.errors.join(" - ") };
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof id !== "string")
                return { errors: "Message id must be a string" };
            return yield this.repository.deleteById(id);
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.deleteAll();
        });
    }
}
exports.default = MessageService;
