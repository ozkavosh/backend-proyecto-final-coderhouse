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
const MessageDTO_1 = __importDefault(require("../dtos/MessageDTO"));
const messageDAOFactory_1 = require("../factories/messageDAOFactory");
const logger_1 = __importDefault(require("../utils/logger"));
let instance = null;
class MessageRepository {
    constructor() {
        this.dao = (0, messageDAOFactory_1.messageDAOFactory)(process.env.STORAGE || "memory");
    }
    save(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdAt = new Date(Date.now()).toLocaleString();
                const newMessage = yield this.dao.save(Object.assign(Object.assign({}, message), { createdAt }));
                return new MessageDTO_1.default(newMessage);
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error saving message" };
            }
        });
    }
    static getInstance() {
        if (!instance) {
            instance = new MessageRepository();
            return instance;
        }
        return instance;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield this.dao.getAll();
                return messages.map((message) => new MessageDTO_1.default(message));
            }
            catch (e) {
                logger_1.default.error(e);
                return { error: "Error fetching messages" };
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield this.dao.getById(id);
                if (message) {
                    return new MessageDTO_1.default(message);
                }
                return { errors: "Message not found" };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error fetching message" };
            }
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield this.getAll();
                const userMessages = messages.filter((message) => message.email === email);
                if (userMessages) {
                    return userMessages.map(message => new MessageDTO_1.default(message));
                }
                return { errors: "Messages not found" };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error fetching messages" };
            }
        });
    }
    update(id, updatedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield this.dao.update(id, updatedMessage);
                if (message) {
                    return new MessageDTO_1.default(message);
                }
                return { errors: "Message not found" };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error updating message" };
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield this.dao.deleteById(id);
                if (message) {
                    return { success: true };
                }
                return { errors: "Message not found" };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error removing message" };
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.dao.deleteAll();
                return { success: true };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error removing messages" };
            }
        });
    }
}
exports.default = MessageRepository;
