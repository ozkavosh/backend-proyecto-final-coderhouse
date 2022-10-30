"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CartDTO {
    constructor({ email, products, createdAt, id, _id, }) {
        this.email = email;
        this.products = products;
        this.createdAt = createdAt;
        this.id = id || _id;
    }
}
exports.default = CartDTO;
