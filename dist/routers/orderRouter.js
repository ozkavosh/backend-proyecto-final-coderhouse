"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderService_1 = __importDefault(require("../services/OrderService"));
const OrderController_1 = __importDefault(require("../controllers/OrderController"));
const OrderRepository_1 = __importDefault(require("../repositories/OrderRepository"));
const jwtAuthRoute_1 = __importDefault(require("../middlewares/jwtAuthRoute"));
const orderRepository = OrderRepository_1.default.getInstance();
const orderService = OrderService_1.default.getInstance(orderRepository);
const orderController = new OrderController_1.default(orderService);
const orderRouter = (0, express_1.Router)();
orderRouter.post("/", jwtAuthRoute_1.default, orderController.postOrder.bind(orderController));
orderRouter.get("/", jwtAuthRoute_1.default, orderController.getOrders.bind(orderController));
orderRouter.get("/:id", jwtAuthRoute_1.default, orderController.getOrder.bind(orderController));
orderRouter.put("/:id", jwtAuthRoute_1.default, orderController.putOrder.bind(orderController));
orderRouter.delete("/:id", jwtAuthRoute_1.default, orderController.deleteOrder.bind(orderController));
orderRouter.delete("/", jwtAuthRoute_1.default, orderController.deleteOrders.bind(orderController));
exports.default = orderRouter;
