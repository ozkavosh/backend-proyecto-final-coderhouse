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
class MVCCartController {
    constructor(cartService, productService) {
        this.cartService = cartService;
        this.productService = productService;
    }
    renderCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.user.email;
            const cart = yield this.cartService.getByEmail(email);
            const cartProducts = yield Promise.all(cart.products.map((product) => __awaiter(this, void 0, void 0, function* () {
                return (Object.assign(Object.assign({}, (yield this.productService.getById(product.id))), { quantity: product.quantity }));
            })));
            return res.render("cart", { cartProducts: cartProducts });
        });
    }
    getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.user.email;
            const carrito = yield this.cartService.getByEmail(email);
            return "errors" in carrito
                ? res.status(404).json(carrito)
                : res.json(carrito);
        });
    }
    createCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.user.email;
            const carrito = yield this.cartService.save({ email, products: [] });
            return res.json(carrito);
        });
    }
    postCartProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.user.email;
            const product = req.body;
            const cart = yield this.cartService.getByEmail(email);
            const response = yield this.cartService.addProduct(cart.id, product);
            return "errors" in response
                ? res.status(404).json(response)
                : res.json(response);
        });
    }
    deleteCartProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const email = req.user.email;
            const cart = yield this.cartService.getByEmail(email);
            const response = yield this.cartService.deleteProductsById(cart.id, id);
            return "errors" in response
                ? res.status(404).json(response)
                : res.json(response);
        });
    }
    completePurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.user.email;
            const cart = yield this.cartService.getByEmail(email);
            const response = yield this.cartService.deleteById(cart.id);
            return "errors" in response
                ? res.status(404).json(response)
                : res.render("purchaseSuccess", {});
        });
    }
}
exports.default = MVCCartController;
