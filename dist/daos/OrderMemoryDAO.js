"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MemoryContainer_1 = __importDefault(require("../containers/MemoryContainer"));
class OrderMemoryDAO extends MemoryContainer_1.default {
    constructor() {
        super();
    }
}
exports.default = OrderMemoryDAO;
