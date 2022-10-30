"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDBContainer_1 = __importDefault(require("../containers/MongoDBContainer"));
const Product_1 = __importDefault(require("../models/Product"));
class ProductFileDAO extends MongoDBContainer_1.default {
    constructor() {
        super(Product_1.default);
    }
}
exports.default = ProductFileDAO;
