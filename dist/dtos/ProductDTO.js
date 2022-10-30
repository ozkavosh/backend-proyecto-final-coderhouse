"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductDTO {
    constructor({ title, price, category, description, photoUrl, id, _id, }) {
        this.title = title;
        this.price = price;
        this.category = category;
        this.description = description;
        this.photoUrl = photoUrl;
        this.id = id || _id;
    }
}
exports.default = ProductDTO;
