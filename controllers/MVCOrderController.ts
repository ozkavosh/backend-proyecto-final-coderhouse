import type { Request, Response } from "express";
import type CartService from "../services/CartService";
import type OrderService from "../services/OrderService";
import type ProductService from "../services/ProductService";
import mailer from "../utils/mailer";
import logger from "../utils/logger";

export default class MVCOrderController {
  orderService: OrderService;
  productService: ProductService;
  cartService: CartService;

  constructor(orderService, productService, cartService) {
    this.orderService = orderService;
    this.productService = productService;
    this.cartService = cartService;
  }

  async renderOrder(req: Request, res: Response) {
    const email = req.user.email;
    const orders = await this.orderService.getByEmail(email);
    res.render("order", { orders });
  }

  async createOrder(req: Request, res: Response) {
    const email = req.user.email;
    const cart: any = await this.cartService.getByEmail(email);
    const cartProducts = await Promise.all(
      cart.products.map(async (product) => ({
        ...(await this.productService.getById(product.id)),
        quantity: product.quantity,
      }))
    );
    await this.orderService.save({
      email,
      products: cartProducts,
    });

    mailer.mailOptions.html = `
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
                .map(
                  (product) =>
                    `<li>Nombre: ${product.title} | Cantidad: ${product.quantity}</li>`
                )
                .join("\n")}
            </ul>
          </div>
          <div style="display:flex;flex-flow:row wrap;">
            <p>Total: $${cartProducts.reduce(
              (acc, product) => acc + product.quantity * product.price,
              0
            )}</p>
          </div>
          `;

    mailer.transporter.sendMail(mailer.mailOptions, function (error, info) {
      if (error) {
        return logger.error(error);
      }

      logger.info(`Se envió un correo: ${info.response}`);
    });
    res.redirect("/carrito/finalizar");
  }
}
