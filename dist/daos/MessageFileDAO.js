"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileContainer_1 = __importDefault(require("../containers/FileContainer"));
class MessageFileDAO extends FileContainer_1.default {
    constructor() {
        super("./db/messages.json");
    }
}
exports.default = MessageFileDAO;