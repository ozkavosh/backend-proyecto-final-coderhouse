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
const ProductDTO_1 = __importDefault(require("../dtos/ProductDTO"));
const productDAOFactory_1 = require("../factories/productDAOFactory");
const logger_1 = __importDefault(require("../utils/logger"));
let instance = null;
class ProductRepository {
    constructor() {
        this.dao = (0, productDAOFactory_1.productDAOFactory)(process.env.STORAGE || "memory");
    }
    save(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = yield this.dao.save(product);
                return new ProductDTO_1.default(newProduct);
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error saving product" };
            }
        });
    }
    static getInstance() {
        if (!instance) {
            instance = new ProductRepository();
            return instance;
        }
        return instance;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.dao.getAll();
                return products.map((product) => new ProductDTO_1.default(product));
            }
            catch (e) {
                logger_1.default.error(e);
                return { error: "Error fetching products" };
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.dao.getById(id);
                if (product) {
                    return new ProductDTO_1.default(product);
                }
                return { errors: "Product not found" };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error fetching product" };
            }
        });
    }
    update(id, updatedProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.dao.update(id, updatedProduct);
                if (product) {
                    return new ProductDTO_1.default(product);
                }
                return { errors: "Product not found" };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error updating product" };
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.dao.deleteById(id);
                if (product) {
                    return { success: true };
                }
                return { errors: "Product not found" };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error removing product" };
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
                return { errors: "Error removing products" };
            }
        });
    }
}
exports.default = ProductRepository;
