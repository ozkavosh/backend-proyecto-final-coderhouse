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
class ProductController {
    constructor(service) {
        this.service = service;
    }
    postProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = req.body;
            if (product) {
                const newProduct = yield this.service.save(product);
                if (!("errors" in newProduct)) {
                    return res.json(newProduct);
                }
                else {
                    return res.status(402).json(newProduct);
                }
            }
            return res.status(402).json({ error: "Missing request body" });
        });
    }
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.service.getAll();
            if (products) {
                return res.json(products);
            }
            return res.status(500).json({ error: "Server error" });
        });
    }
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const product = yield this.service.getById(id);
                if (!("errors" in product)) {
                    return res.json(product);
                }
                else {
                    return res.status(402).json(product);
                }
            }
            return res
                .status(402)
                .json({ error: "Missing product id" });
        });
    }
    putProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const product = req.body;
            if (product && id) {
                const newProduct = yield this.service.update(id, product);
                if (!("errors" in newProduct)) {
                    return res.json(newProduct);
                }
                else {
                    return res.status(402).json(newProduct);
                }
            }
            return res
                .status(402)
                .json({ error: "Missing request body or product id" });
        });
    }
    deleteProduct(req, res) {
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
                .json({ error: "Missing product id" });
        });
    }
    deleteProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield this.service.deleteAll());
        });
    }
}
exports.default = ProductController;
