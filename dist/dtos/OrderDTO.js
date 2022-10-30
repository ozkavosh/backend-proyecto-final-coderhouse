"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderDTO {
    constructor({ email, products, createdAt, orderNum, status, id, _id, }) {
        this.email = email;
        this.products = products;
        this.createdAt = createdAt;
        this.orderNum = orderNum;
        this.status = status;
        this.id = id || _id;
    }
}
exports.default = OrderDTO;
