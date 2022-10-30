import { Router } from "express";
import passport from "../utils/passport";
import ProductRepository from "../repositories/ProductRepository";
import ProductService from "../services/ProductService";
import CartRepository from "../repositories/CartRepository";
import CartService from "../services/CartService";
import OrderRepository from "../repositories/OrderRepository";
import OrderService from "../services/OrderService";
import MessageRepository from "../repositories/MessageRepository";
import MessageService from "../services/MessageService";
import passportAuthRoute from "../middlewares/passportAuthRoute";
import MVCChatController from "../controllers/MVCChatController";
import MVCConfigController from "../controllers/MVCConfigController";
import MVCOrderController from "../controllers/MVCOrderController";
import MVCCartController from "../controllers/MVCCartController";
import MVCProductController from "../controllers/MVCProductController";
import MVCUserController from "../controllers/MVCUserController";

const productRepository = ProductRepository.getInstance();
const productService = ProductService.getInstance(productRepository);
const cartRepository = CartRepository.getInstance();
const cartService = CartService.getInstance(cartRepository);
const orderRepository = OrderRepository.getInstance();
const orderService = OrderService.getInstance(orderRepository);
const messageRepository = MessageRepository.getInstance();
const messageService = MessageService.getInstance(messageRepository);
const chatController = new MVCChatController(messageService);
const configController = new MVCConfigController();
const orderController = new MVCOrderController(
  orderService,
  productService,
  cartService
);
const cartController = new MVCCartController(cartService, productService);
const productController = new MVCProductController(productService);
const userController = new MVCUserController();
const mvcRouter = Router();

mvcRouter.get("/", passportAuthRoute, userController.getIndex);
mvcRouter.get("/chat", passportAuthRoute, chatController.renderChat);
mvcRouter.get(
  "/chat/:id",
  passportAuthRoute,
  chatController.renderOwnMessages.bind(chatController)
);
mvcRouter.get("/configuracion", configController.renderConfig);
mvcRouter.get(
  "/orden",
  passportAuthRoute,
  orderController.renderOrder.bind(orderController)
);
mvcRouter.get(
  "/orden/nuevo",
  passportAuthRoute,
  orderController.createOrder.bind(orderController)
);
mvcRouter.get(
  "/carrito",
  passportAuthRoute,
  cartController.renderCart.bind(cartController)
);
mvcRouter.get(
  "/carrito/info",
  passportAuthRoute,
  cartController.getCart.bind(cartController)
);
mvcRouter.get(
  "/carrito/nuevo",
  passportAuthRoute,
  cartController.createCart.bind(cartController)
);
mvcRouter.post(
  "/carrito",
  passportAuthRoute,
  cartController.postCartProduct.bind(cartController)
);
mvcRouter.delete(
  "/carrito/producto/:id",
  passportAuthRoute,
  cartController.deleteCartProduct.bind(cartController)
);
mvcRouter.get(
  "/carrito/finalizar",
  passportAuthRoute,
  cartController.completePurchase.bind(cartController)
);
mvcRouter.get(
  "/productos",
  passportAuthRoute,
  productController.renderProducts.bind(productController)
);
mvcRouter.get(
  "/productos/:category",
  passportAuthRoute,
  productController.renderProductsCategory.bind(productController)
);
mvcRouter.get(
  "/producto/:id",
  passportAuthRoute,
  productController.renderProduct.bind(productController)
);
mvcRouter.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.getLoginSuccess
);
mvcRouter.post(
  "/signup",
  passport.authenticate("signup", {
    failureRedirect: "/signup",
    failureFlash: true,
  }),
  userController.getSignupSuccess
);
mvcRouter.get("/login", userController.renderLogin);
mvcRouter.get("/signup", userController.renderSignup);
mvcRouter.get("/logout", passportAuthRoute, userController.getLogout);

export const getConnection = (io) => {
  return async (socket) => {
    const messages = await messageService.getAll();
    socket.emit("getMessages", messages);

    socket.on("postMessage", async (message) => {
      await messageService.save(message);
      const messages = await messageService.getAll();
      io.sockets.emit("getMessages", messages);
    });
  };
};

export default mvcRouter;
