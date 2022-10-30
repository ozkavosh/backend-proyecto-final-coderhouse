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
const mailer_1 = __importDefault(require("../utils/mailer"));
const logger_1 = __importDefault(require("../utils/logger"));
class MVCOrderController {
    constructor(orderService, productService, cartService) {
        this.orderService = orderService;
        this.productService = productService;
        this.cartService = cartService;
    }
    renderOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.user.email;
            const orders = yield this.orderService.getByEmail(email);
            res.render("order", { orders });
        });
    }
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.user.email;
            const cart = yield this.cartService.getByEmail(email);
            const cartProducts = yield Promise.all(cart.products.map((product) => __awaiter(this, void 0, void 0, function* () {
                return (Object.assign(Object.assign({}, (yield this.productService.getById(product.id))), { quantity: product.quantity }));
            })));
            yield this.orderService.save({
                email,
                products: cartProducts,
            });
            mailer_1.default.mailOptions.html = `
          <div style="color:white; text-align:center; text-transform: uppercase; padding-top: 12px; padding-bottom: 12px; background-color: black;">Backend Shop</div>
          <b>Se registró una nueva compra: </b>
          <br>
          <div>
            <p>Usuario: ${email}</p>
          </div>
          <div>
            <p>Productos:</p>
            <ul>
              ${cartProducts
                .map((product) => `<li>Nombre: ${product.title} | Cantidad: ${product.quantity}</li>`)
                .join("\n")}
            </ul>
          </div>
          <div style="display:flex;flex-flow:row wrap;">
            <p>Total: $${cartProducts.reduce((acc, product) => acc + product.quantity * product.price, 0)}</p>
          </div>
          `;
            mailer_1.default.transporter.sendMail(mailer_1.default.mailOptions, function (error, info) {
                if (error) {
                    return logger_1.default.error(error);
                }
                logger_1.default.info(`Se envió un correo: ${info.response}`);
            });
            res.redirect("/carrito/finalizar");
        });
    }
}
exports.default = MVCOrderController;
