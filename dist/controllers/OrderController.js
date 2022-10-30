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
class OrderController {
    constructor(service) {
        this.service = service;
    }
    postOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = req.body;
            if (order) {
                const newOrder = yield this.service.save(order);
                if (!("errors" in newOrder)) {
                    return res.json(newOrder);
                }
                else {
                    return res.status(402).json(newOrder);
                }
            }
            return res.status(402).json({ error: "Missing request body" });
        });
    }
    getOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.service.getAll();
            if (orders) {
                return res.json(orders);
            }
            return res.status(500).json({ error: "Server error" });
        });
    }
    getOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const order = id.includes("@") ? yield this.service.getByEmail(id) : yield this.service.getById(id);
                if (!("errors" in order)) {
                    return res.json(order);
                }
                else {
                    return res.status(402).json(order);
                }
            }
            return res
                .status(402)
                .json({ error: "Missing order id" });
        });
    }
    putOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const order = req.body;
            if (order && id) {
                const newOrder = yield this.service.update(id, order);
                if (!("errors" in newOrder)) {
                    return res.json(newOrder);
                }
                else {
                    return res.status(402).json(newOrder);
                }
            }
            return res
                .status(402)
                .json({ error: "Missing request body or order id" });
        });
    }
    deleteOrder(req, res) {
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
                .json({ error: "Missing order id" });
        });
    }
    deleteOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield this.service.deleteAll());
        });
    }
}
exports.default = OrderController;
