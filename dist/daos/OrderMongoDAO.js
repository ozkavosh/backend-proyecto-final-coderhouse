"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDBContainer_1 = __importDefault(require("../containers/MongoDBContainer"));
const Order_1 = __importDefault(require("../models/Order"));
class OrderFileDAO extends MongoDBContainer_1.default {
    constructor() {
        super(Order_1.default);
    }
}
exports.default = OrderFileDAO;
