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
exports.getConnection = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("../utils/passport"));
const ProductRepository_1 = __importDefault(require("../repositories/ProductRepository"));
const ProductService_1 = __importDefault(require("../services/ProductService"));
const CartRepository_1 = __importDefault(require("../repositories/CartRepository"));
const CartService_1 = __importDefault(require("../services/CartService"));
const OrderRepository_1 = __importDefault(require("../repositories/OrderRepository"));
const OrderService_1 = __importDefault(require("../services/OrderService"));
const MessageRepository_1 = __importDefault(require("../repositories/MessageRepository"));
const MessageService_1 = __importDefault(require("../services/MessageService"));
const passportAuthRoute_1 = __importDefault(require("../middlewares/passportAuthRoute"));
const MVCChatController_1 = __importDefault(require("../controllers/MVCChatController"));
const MVCConfigController_1 = __importDefault(require("../controllers/MVCConfigController"));
const MVCOrderController_1 = __importDefault(require("../controllers/MVCOrderController"));
const MVCCartController_1 = __importDefault(require("../controllers/MVCCartController"));
const MVCProductController_1 = __importDefault(require("../controllers/MVCProductController"));
const MVCUserController_1 = __importDefault(require("../controllers/MVCUserController"));
const productRepository = ProductRepository_1.default.getInstance();
const productService = ProductService_1.default.getInstance(productRepository);
const cartRepository = CartRepository_1.default.getInstance();
const cartService = CartService_1.default.getInstance(cartRepository);
const orderRepository = OrderRepository_1.default.getInstance();
const orderService = OrderService_1.default.getInstance(orderRepository);
const messageRepository = MessageRepository_1.default.getInstance();
const messageService = MessageService_1.default.getInstance(messageRepository);
const chatController = new MVCChatController_1.default(messageService);
const configController = new MVCConfigController_1.default();
const orderController = new MVCOrderController_1.default(orderService, productService, cartService);
const cartController = new MVCCartController_1.default(cartService, productService);
const productController = new MVCProductController_1.default(productService);
const userController = new MVCUserController_1.default();
const mvcRouter = (0, express_1.Router)();
mvcRouter.get("/", passportAuthRoute_1.default, userController.getIndex);
mvcRouter.get("/chat", passportAuthRoute_1.default, chatController.renderChat);
mvcRouter.get("/chat/:id", passportAuthRoute_1.default, chatController.renderOwnMessages.bind(chatController));
mvcRouter.get("/configuracion", configController.renderConfig);
mvcRouter.get("/orden", passportAuthRoute_1.default, orderController.renderOrder.bind(orderController));
mvcRouter.get("/orden/nuevo", passportAuthRoute_1.default, orderController.createOrder.bind(orderController));
mvcRouter.get("/carrito", passportAuthRoute_1.default, cartController.renderCart.bind(cartController));
mvcRouter.get("/carrito/info", passportAuthRoute_1.default, cartController.getCart.bind(cartController));
mvcRouter.get("/carrito/nuevo", passportAuthRoute_1.default, cartController.createCart.bind(cartController));
mvcRouter.post("/carrito", passportAuthRoute_1.default, cartController.postCartProduct.bind(cartController));
mvcRouter.delete("/carrito/producto/:id", passportAuthRoute_1.default, cartController.deleteCartProduct.bind(cartController));
mvcRouter.get("/carrito/finalizar", passportAuthRoute_1.default, cartController.completePurchase.bind(cartController));
mvcRouter.get("/productos", passportAuthRoute_1.default, productController.renderProducts.bind(productController));
mvcRouter.get("/productos/:category", passportAuthRoute_1.default, productController.renderProductsCategory.bind(productController));
mvcRouter.get("/producto/:id", passportAuthRoute_1.default, productController.renderProduct.bind(productController));
mvcRouter.post("/login", passport_1.default.authenticate("login", {
    failureRedirect: "/login",
    failureFlash: true,
}), userController.getLoginSuccess);
mvcRouter.post("/signup", passport_1.default.authenticate("signup", {
    failureRedirect: "/signup",
    failureFlash: true,
}), userController.getSignupSuccess);
mvcRouter.get("/login", userController.renderLogin);
mvcRouter.get("/signup", userController.renderSignup);
mvcRouter.get("/logout", passportAuthRoute_1.default, userController.getLogout);
const getConnection = (io) => {
    return (socket) => __awaiter(void 0, void 0, void 0, function* () {
        const messages = yield messageService.getAll();
        socket.emit("getMessages", messages);
        socket.on("postMessage", (message) => __awaiter(void 0, void 0, void 0, function* () {
            yield messageService.save(message);
            const messages = yield messageService.getAll();
            io.sockets.emit("getMessages", messages);
        }));
    });
};
exports.getConnection = getConnection;
exports.default = mvcRouter;
