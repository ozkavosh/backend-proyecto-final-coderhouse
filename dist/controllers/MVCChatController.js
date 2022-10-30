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
class MVCChatController {
    constructor(service) {
        this.service = service;
    }
    renderChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.user.email;
            res.render("chat", { email });
        });
    }
    renderOwnMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.params.id;
            const messages = yield this.service.getByEmail(email);
            res.render("ownMessages", { messages });
        });
    }
}
exports.default = MVCChatController;
