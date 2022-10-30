"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CartDTO {
    constructor({ email, name, cellphone, id, _id }) {
        this.email = email;
        this.name = name;
        this.cellphone = cellphone;
        this.id = id || _id;
    }
}
exports.default = CartDTO;
