"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    email: { type: "string" },
    createdAt: { type: "string" },
    body: { type: "string" },
});
exports.default = (0, mongoose_1.model)("Message", messageSchema, "messages");
