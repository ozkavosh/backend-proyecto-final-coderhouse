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
const cartSchema_1 = require("../utils/yup-schemas/cartSchema");
const cartProductSchema_1 = __importDefault(require("../utils/yup-schemas/cartProductSchema"));
const logger_1 = __importDefault(require("../utils/logger"));
const productExists_1 = __importDefault(require("../utils/productExists"));
let instance = null;
class CartService {
    constructor(repository) {
        this.repository = repository;
    }
    static getInstance(repository) {
        if (!instance) {
            instance = new CartService(repository);
            return instance;
        }
        return instance;
    }
    save(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, cartSchema_1.isValidCart)(object);
                return yield this.repository.save(object);
            }
            catch (e) {
                logger_1.default.debug("Errors saving cart: " + e.errors.join(" - "));
                return { errors: e.errors.join(" - ") };
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getAll();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof id !== "string")
                return { errors: "Cart id must be a string" };
            return yield this.repository.getById(id);
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof email !== "string")
                return { errors: "Cart owner email must be a string" };
            return yield this.repository.getByEmail(email);
        });
    }
    update(id, object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, cartSchema_1.isValidUpdatedCart)(object);
                return yield this.repository.update(id, object);
            }
            catch (e) {
                logger_1.default.debug("Errors updating cart: " + e.errors.join(" - "));
                return { errors: e.errors.join(" - ") };
            }
        });
    }
    addProduct(id, object, remove) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!remove)
                    yield (0, cartProductSchema_1.default)(object);
                const validProduct = yield (0, productExists_1.default)(object.id);
                if (validProduct) {
                    return yield this.repository.addProduct(id, object);
                }
                return {
                    errors: "Product does not exist",
                };
            }
            catch (e) {
                logger_1.default.debug("Errors adding product to cart: " + e.errors.join(" - "));
                return { errors: e.errors.join(" - ") };
            }
        });
    }
    removeProductById(cartId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.addProduct(cartId, { id: productId, quantity: -1 }, true);
        });
    }
    deleteProductsById(cartId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.deleteProductsById(cartId, productId);
        });
    }
    deleteProducts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.deleteProducts(id);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof id !== "string")
                return { errors: "Cart id must be a string" };
            return yield this.repository.deleteById(id);
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.deleteAll();
        });
    }
}
exports.default = CartService;
