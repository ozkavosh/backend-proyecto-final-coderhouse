"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    products: { type: "array" },
    createdAt: { type: "string" },
    orderNum: { type: "number" },
    status: { type: "string" },
    email: { type: "string" },
});
exports.default = (0, mongoose_1.model)("Order", orderSchema, "orders");
