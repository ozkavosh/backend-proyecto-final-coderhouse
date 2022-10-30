"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class CartController {
    constructor(service) {
        this.service = service;
    }
    postCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = req.body;
            if (cart) {
                const newCart = yield this.service.save(cart);
                if (!("errors" in newCart)) {
                    return res.json(newCart);
                }
                else {
                    return res.status(402).json(newCart);
                }
            }
            return res.status(402).json({ error: "Missing request body" });
        });
    }
    postCartProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const product = req.body;
            if (product) {
                const updatedCart = yield this.service.addProduct(id, product);
                if (!("errors" in updatedCart)) {
                    return res.json(updatedCart);
                }
                else {
                    return res.status(402).json(updatedCart);
                }
            }
            return res.status(402).json({ error: "Missing request body" });
        });
    }
    getCarts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const carts = yield this.service.getAll();
            if (carts) {
                return res.json(carts);
            }
            return res.status(500).json({ error: "Server error" });
        });
    }
    getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const cart = id.includes("@") ? yield this.service.getByEmail(id) : yield this.service.getById(id);
                if (!("errors" in cart)) {
                    return res.json(cart);
                }
                else {
                    return res.status(402).json(cart);
                }
            }
            return res
                .status(402)
                .json({ error: "Missing cart id" });
        });
    }
    putCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const cart = req.body;
            if (cart && id) {
                const newCart = yield this.service.update(id, cart);
                if (!("errors" in newCart)) {
                    return res.json(newCart);
                }
                else {
                    return res.status(402).json(newCart);
                }
            }
            return res
                .status(402)
                .json({ error: "Missing request body or cart id" });
        });
    }
    deleteCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const deleteResult = yield this.service.deleteById(id);
                if (!("errors" in deleteResult)) {
                    return res.json(deleteResult);
                }
                else {
                    return res.status(402).json(deleteResult);
                }
            }
            return res
                .status(402)
                .json({ error: "Missing cart id" });
        });
    }
    deleteCarts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield this.service.deleteAll());
        });
    }
    removeCartProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cartId, productId } = req.params;
            if (cartId && productId) {
                const deleteResult = yield this.service.removeProductById(cartId, productId);
                if (!("errors" in deleteResult)) {
                    return res.json(deleteResult);
                }
                else {
                    return res.status(402).json(deleteResult);
                }
            }
            return res
                .status(402)
                .json({ error: "Missing cart or product id" });
        });
    }
    deleteCartProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cartId, productId } = req.params;
            if (cartId && productId) {
                const deleteResult = yield this.service.deleteProductsById(cartId, productId);
                if (!("errors" in deleteResult)) {
                    return res.json(deleteResult);
                }
                else {
                    return res.status(402).json(deleteResult);
                }
            }
            return res
                .status(402)
                .json({ error: "Missing cart or product id" });
        });
    }
    deleteCartProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const deleteResult = yield this.service.deleteProducts(id);
                if (!("errors" in deleteResult)) {
                    return res.json(deleteResult);
                }
                else {
                    return res.status(402).json(deleteResult);
                }
            }
            return res
                .status(402)
                .json({ error: "Missing cart or product id" });
        });
    }
}
exports.default = CartController;
