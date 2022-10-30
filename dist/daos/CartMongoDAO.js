"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDBContainer_1 = __importDefault(require("../containers/MongoDBContainer"));
const Cart_1 = __importDefault(require("../models/Cart"));
class CartFileDAO extends MongoDBContainer_1.default {
    constructor() {
        super(Cart_1.default);
    }
}
exports.default = CartFileDAO;
