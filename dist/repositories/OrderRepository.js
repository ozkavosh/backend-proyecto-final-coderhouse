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
const OrderDTO_1 = __importDefault(require("../dtos/OrderDTO"));
const orderDAOFactory_1 = require("../factories/orderDAOFactory");
const logger_1 = __importDefault(require("../utils/logger"));
let instance = null;
class OrderRepository {
    constructor() {
        this.dao = (0, orderDAOFactory_1.orderDAOFactory)(process.env.STORAGE || "memory");
    }
    save(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdAt = new Date(Date.now()).toLocaleString();
                const orderNum = (yield this.getAll()).length + 1;
                const newOrder = yield this.dao.save(Object.assign(Object.assign({}, order), { createdAt, orderNum }));
                return new OrderDTO_1.default(newOrder);
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error saving order" };
            }
        });
    }
    static getInstance() {
        if (!instance) {
            instance = new OrderRepository();
            return instance;
        }
        return instance;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.dao.getAll();
                return orders.map((order) => new OrderDTO_1.default(order));
            }
            catch (e) {
                logger_1.default.error(e);
                return { error: "Error fetching orders" };
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield this.dao.getById(id);
                if (order) {
                    return new OrderDTO_1.default(order);
                }
                return { errors: "Order not found" };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error fetching order" };
            }
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.getAll();
                const userOrders = orders.filter((cart) => cart.email === email);
                if (userOrders) {
                    return userOrders.map(order => new OrderDTO_1.default(order));
                }
                return { errors: "Orders not found" };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error fetching order" };
            }
        });
    }
    update(id, updatedOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield this.dao.update(id, updatedOrder);
                if (order) {
                    return new OrderDTO_1.default(order);
                }
                return { errors: "Order not found" };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error updating order" };
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield this.dao.deleteById(id);
                if (order) {
                    return { success: true };
                }
                return { errors: "Order not found" };
            }
            catch (e) {
                logger_1.default.error(e);
                return { errors: "Error removing order" };
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
                return { errors: "Error removing orders" };
            }
        });
    }
}
exports.default = OrderRepository;
