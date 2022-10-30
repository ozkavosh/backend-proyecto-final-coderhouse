import type CartService from "../services/CartService";
import type ProductService from "../services/ProductService";
import type { Request, Response } from "express";

export default class MVCCartController {
  cartService: CartService;
  productService: ProductService;

  constructor(cartService, productService) {
    this.cartService = cartService;
    this.productService = productService;
  }

  async renderCart(req: Request, res: Response) {
    const email = req.user.email;
    const cart: any = await this.cartService.getByEmail(email);
    const cartProducts = await Promise.all(
      cart.products.map(async (product) => ({
        ...(await this.productService.getById(product.id)),
        quantity: product.quantity,
      }))
    );
    return res.render("cart", { cartProducts: cartProducts });
  }

  async getCart(req: Request, res: Response) {
    const email = req.user.email;
    const carrito = await this.cartService.getByEmail(email);
    return "errors" in carrito
      ? res.status(404).json(carrito)
      : res.json(carrito);
  }

  async createCart(req: Request, res: Response) {
    const email = req.user.email;
    const carrito = await this.cartService.save({ email, products: [] });
    return res.json(carrito);
  }

  async postCartProduct(req: Request, res: Response) {
    const email = req.user.email;
    const product = req.body;
    const cart: any = await this.cartService.getByEmail(email);
    const response = await this.cartService.addProduct(cart.id, product);
    return "errors" in response
      ? res.status(404).json(response)
      : res.json(response);
  }

  async deleteCartProduct(req: Request, res: Response) {
    const id = req.params.id;
    const email = req.user.email;
    const cart: any = await this.cartService.getByEmail(email);
    const response = await this.cartService.deleteProductsById(cart.id, id);
    return "errors" in response
      ? res.status(404).json(response)
      : res.json(response);
  }

  async completePurchase(req: Request, res: Response) {
    const email = req.user.email;
    const cart: any = await this.cartService.getByEmail(email);
    const response = await this.cartService.deleteById(cart.id);
    return "errors" in response
      ? res.status(404).json(response)
      : res.render("purchaseSuccess", {});
  }
}
