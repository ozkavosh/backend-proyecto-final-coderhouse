import { Router } from "express";
import OrderService from "../services/OrderService";
import OrderController from "../controllers/OrderController";
import OrderRepository from "../repositories/OrderRepository";
import jwtAuthRoute from "../middlewares/jwtAuthRoute";

const orderRepository = OrderRepository.getInstance();
const orderService = OrderService.getInstance(orderRepository);
const orderController = new OrderController(orderService);
const orderRouter = Router();

orderRouter.post(
  "/",
  jwtAuthRoute,
  orderController.postOrder.bind(orderController)
);
orderRouter.get(
  "/",
  jwtAuthRoute,
  orderController.getOrders.bind(orderController)
);
orderRouter.get(
  "/:id",
  jwtAuthRoute,
  orderController.getOrder.bind(orderController)
);
orderRouter.put(
  "/:id",
  jwtAuthRoute,
  orderController.putOrder.bind(orderController)
);
orderRouter.delete(
  "/:id",
  jwtAuthRoute,
  orderController.deleteOrder.bind(orderController)
);
orderRouter.delete(
  "/",
  jwtAuthRoute,
  orderController.deleteOrders.bind(orderController)
);

export default orderRouter;
