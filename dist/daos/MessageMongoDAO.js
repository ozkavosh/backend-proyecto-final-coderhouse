"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDBContainer_1 = __importDefault(require("../containers/MongoDBContainer"));
const Message_1 = __importDefault(require("../models/Message"));
class MessageFileDAO extends MongoDBContainer_1.default {
    constructor() {
        super(Message_1.default);
    }
}
exports.default = MessageFileDAO;
