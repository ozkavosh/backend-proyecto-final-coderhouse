import { Router } from "express";
import CartService from "../services/CartService";
import CartController from "../controllers/CartController";
import CartRepository from "../repositories/CartRepository";
import jwtAuthRoute from "../middlewares/jwtAuthRoute";

const cartRepository = CartRepository.getInstance();
const cartService = CartService.getInstance(cartRepository);
const cartController = new CartController(cartService);
const cartRouter = Router();

cartRouter.post(
  "/",
  jwtAuthRoute,
  cartController.postCart.bind(cartController)
);
cartRouter.post(
  "/:id",
  jwtAuthRoute,
  cartController.postCartProduct.bind(cartController)
);
cartRouter.get("/", jwtAuthRoute, cartController.getCarts.bind(cartController));
cartRouter.get(
  "/:id",
  jwtAuthRoute,
  cartController.getCart.bind(cartController)
);
cartRouter.put(
  "/:id",
  jwtAuthRoute,
  cartController.putCart.bind(cartController)
);
cartRouter.patch(
  "/:cartId/:productId",
  jwtAuthRoute,
  cartController.removeCartProduct.bind(cartController)
);
cartRouter.patch(
  "/:id",
  jwtAuthRoute,
  cartController.deleteCartProducts.bind(cartController)
);
cartRouter.delete(
  "/:id",
  jwtAuthRoute,
  cartController.deleteCart.bind(cartController)
);
cartRouter.delete(
  "/",
  jwtAuthRoute,
  cartController.deleteCarts.bind(cartController)
);
cartRouter.delete(
  "/:cartId/:productId",
  jwtAuthRoute,
  cartController.deleteCartProduct.bind(cartController)
);

export default cartRouter;
