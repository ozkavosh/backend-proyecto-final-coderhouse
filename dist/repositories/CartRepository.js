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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CartDTO_1 = __importDefault(require("../dtos/CartDTO"));
const cartDAOFactory_1 = require("../factories/cartDAOFactory");
const logger_1 = __importDefault(require("../utils/logger"));
let instance = null;
class CartRepository {
    constructor() {
        this.dao = (0, cartDAOFactory_1.cartDAOFactory)(process.env.STORAGE || "memory");
    }
    save(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdAt = new Date(Date.now()).toLocaleString();
                const newCart = yield this.dao.save(Object.assign(Object.assign({}, cart), { createdAt }));
                return new CartDTO_1.default(newCart);
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error saving cart" };
            }
        });
    }
    static getInstance() {
        if (!instance) {
            instance = new CartRepository();
            return instance;
        }
        return instance;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carts = yield this.dao.getAll();
                return carts.map((cart) => new CartDTO_1.default(cart));
            }
            catch (e) {
                logger_1.default.error(e);
                return { error: "Error fetching carts" };
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield this.dao.getById(id);
                if (cart) {
                    return new CartDTO_1.default(cart);
                }
                return { errors: "Cart not found" };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error fetching cart" };
            }
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carts = yield this.getAll();
                const cart = carts.find((cart) => cart.email === email);
                if (cart) {
                    return new CartDTO_1.default(cart);
                }
                return { errors: "Cart not found" };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error fetching cart" };
            }
        });
    }
    update(id, updatedCart) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield this.dao.update(id, updatedCart);
                if (cart) {
                    return new CartDTO_1.default(cart);
                }
                return { errors: "Cart not found" };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error updating cart" };
            }
        });
    }
    addProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield this.dao.getById(id);
                if (cart) {
                    const normalizedCart = cart._doc || cart;
                    const productInCart = normalizedCart.products.findIndex(({ id }) => id === product.id);
                    let updatedCartProducts = normalizedCart.products;
                    if (productInCart !== -1) {
                        updatedCartProducts[productInCart].quantity += product.quantity;
                    }
                    else {
                        updatedCartProducts = [...updatedCartProducts, product];
                    }
                    const updatedCart = yield this.dao.update(id, Object.assign(Object.assign({}, normalizedCart), { products: updatedCartProducts }));
                    return new CartDTO_1.default(updatedCart);
                }
                return { errors: "Cart not found" };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error updating cart" };
            }
        });
    }
    deleteProductsById(cartId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield this.dao.getById(cartId);
                if (cart) {
                    const normalizedCart = cart._doc || cart;
                    const productInCart = normalizedCart.products.findIndex(({ id }) => id === productId);
                    let updatedCartProducts = normalizedCart.products;
                    if (productInCart !== -1) {
                        updatedCartProducts.splice(productInCart, 1);
                    }
                    else {
                        return { errors: "Product not found in cart" };
                    }
                    const updatedCart = yield this.dao.update(cartId, Object.assign(Object.assign({}, normalizedCart), { products: updatedCartProducts }));
                    return new CartDTO_1.default(updatedCart);
                }
                return { errors: "Cart not found" };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error updating cart" };
            }
        });
    }
    deleteProducts(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield this.dao.getById(cartId);
                if (cart) {
                    const normalizedCart = cart._doc || cart;
                    const updatedCart = yield this.dao.update(cartId, Object.assign(Object.assign({}, normalizedCart), { products: [] }));
                    return new CartDTO_1.default(updatedCart);
                }
                return { errors: "Cart not found" };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error updating cart" };
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield this.dao.deleteById(id);
                if (cart) {
                    return { success: true };
                }
                return { errors: "Cart not found" };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error removing cart" };
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.dao.deleteAll();
                return { success: true };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error removing carts" };
            }
        });
    }
}
exports.default = CartRepository;
