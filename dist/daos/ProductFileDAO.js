"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileContainer_1 = __importDefault(require("../containers/FileContainer"));
class ProductFileDAO extends FileContainer_1.default {
    constructor() {
        super("./db/products.json");
    }
}
exports.default = ProductFileDAO;