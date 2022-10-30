"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreContainer_1 = __importDefault(require("../containers/FirestoreContainer"));
class OrderFileDAO extends FirestoreContainer_1.default {
    constructor() {
        super("orders");
    }
}
exports.default = OrderFileDAO;
