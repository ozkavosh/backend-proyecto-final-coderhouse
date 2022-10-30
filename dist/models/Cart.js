"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    email: { type: "string" },
    createdAt: { type: "string" },
    products: { type: "array" },
});
exports.default = (0, mongoose_1.model)("Cart", productSchema, "carts");
