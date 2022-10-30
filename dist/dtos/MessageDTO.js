"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CartDTO {
    constructor({ email, body, createdAt, id, _id, }) {
        this.email = email;
        this.body = body;
        this.createdAt = createdAt;
        this.id = id || _id;
    }
}
exports.default = CartDTO;
