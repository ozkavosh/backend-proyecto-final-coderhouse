"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    password: { type: "string" },
    name: { type: "string" },
    email: { type: "string" },
    cellphone: { type: "number" },
});
exports.default = (0, mongoose_1.model)("User", userSchema);
