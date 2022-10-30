"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    title: { type: "string" },
    price: { type: "number" },
    category: { type: "string" },
    description: { type: "string" },
    photoUrl: { type: "string" },
});
exports.default = (0, mongoose_1.model)("Product", productSchema, "products");
