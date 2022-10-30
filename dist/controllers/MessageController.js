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
Object.defineProperty(exports, "__esModule", { value: true });
class MessageController {
    constructor(service) {
        this.service = service;
    }
    postMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = req.body;
            if (message) {
                const newMessage = yield this.service.save(message);
                if (!("errors" in newMessage)) {
                    return res.json(newMessage);
                }
                else {
                    return res.status(402).json(newMessage);
                }
            }
            return res.status(402).json({ error: "Missing request body" });
        });
    }
    getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield this.service.getAll();
            if (messages) {
                return res.json(messages);
            }
            return res.status(500).json({ error: "Server error" });
        });
    }
    getMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const message = id.includes("@") ? yield this.service.getByEmail(id) : yield this.service.getById(id);
                if (!("errors" in message)) {
                    return res.json(message);
                }
                else {
                    return res.status(402).json(message);
                }
            }
            return res
                .status(402)
                .json({ error: "Missing message id" });
        });
    }
    putMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const message = req.body;
            if (message && id) {
                const newMessage = yield this.service.update(id, message);
                if (!("errors" in newMessage)) {
                    return res.json(newMessage);
                }
                else {
                    return res.status(402).json(newMessage);
                }
            }
            return res
                .status(402)
                .json({ error: "Missing request body or message id" });
        });
    }
    deleteMessage(req, res) {
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
            return res
                .status(402)
                .json({ error: "Missing message id" });
        });
    }
    deleteMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield this.service.deleteAll());
        });
    }
}
exports.default = MessageController;
