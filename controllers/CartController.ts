import type { Request, Response } from "express";
import type CartService from "../services/CartService";

export default class CartController {
  service: CartService;

  constructor(service: CartService) {
    this.service = service;
  }

  async postCart(req: Request, res: Response) {
    const cart = req.body;
    if (cart) {
      const newCart = await this.service.save(cart);
      if (!("errors" in newCart)) {
        return res.json(newCart);
      } else {
        return res.status(402).json(newCart);
      }
    }
    return res.status(402).json({ error: "Missing request body" });
  }

  async postCartProduct(req: Request, res: Response) {
    const id = req.params.id;
    const product = req.body;
    if (product) {
      const updatedCart = await this.service.addProduct(id, product);
      if (!("errors" in updatedCart)) {
        return res.json(updatedCart);
      } else {
        return res.status(402).json(updatedCart);
      }
    }
    return res.status(402).json({ error: "Missing request body" });
  }

  async getCarts(req: Request, res: Response) {
    const carts = await this.service.getAll();
    if (carts) {
      return res.json(carts);
    }
    return res.status(500).json({ error: "Server error" });
  }

  async getCart(req: Request, res: Response) {
    const id = req.params.id;
    if (id) {
      const cart = id.includes("@") ? await this.service.getByEmail(id) : await this.service.getById(id);
      if (!("errors" in cart)) {
        return res.json(cart);
      } else {
        return res.status(402).json(cart);
      }
    }
    return res
      .status(402)
      .json({ error: "Missing cart id" });
  }

  async putCart(req: Request, res: Response) {
    const id = req.params.id;
    const cart = req.body;
    if (cart && id) {
      const newCart = await this.service.update(id, cart);
      if (!("errors" in newCart)) {
        return res.json(newCart);
      } else {
        return res.status(402).json(newCart);
      }
    }
    return res
      .status(402)
      .json({ error: "Missing request body or cart id" });
  }

  async deleteCart(req: Request, res: Response) {
    const id = req.params.id;
    if (id) {
      const deleteResult = await this.service.deleteById(id);
      if (!("errors" in deleteResult)) {
        return res.json(deleteResult);
      } else {
        return res.status(402).json(deleteResult);
      }
    }
    return res
      .status(402)
      .json({ error: "Missing cart id" });
  }

  async deleteCarts(req: Request, res: Response){
    res.json(await this.service.deleteAll());
  }

  async removeCartProduct(req: Request, res: Response){
    const {cartId, productId} = req.params;
    if (cartId && productId) {
      const deleteResult = await this.service.removeProductById(cartId, productId);
      if (!("errors" in deleteResult)) {
        return res.json(deleteResult);
      } else {
        return res.status(402).json(deleteResult);
      }
    }
    return res
      .status(402)
      .json({ error: "Missing cart or product id" });
  }

  async deleteCartProduct(req: Request, res: Response){
    const {cartId, productId} = req.params;
    if (cartId && productId) {
      const deleteResult = await this.service.deleteProductsById(cartId, productId);
      if (!("errors" in deleteResult)) {
        return res.json(deleteResult);
      } else {
        return res.status(402).json(deleteResult);
      }
    }
    return res
      .status(402)
      .json({ error: "Missing cart or product id" });
  }

  async deleteCartProducts(req: Request, res: Response){
    const id = req.params.id;
    if (id) {
      const deleteResult = await this.service.deleteProducts(id);
      if (!("errors" in deleteResult)) {
        return res.json(deleteResult);
      } else {
        return res.status(402).json(deleteResult);
      }
    }
    return res
      .status(402)
      .json({ error: "Missing cart or product id" });
  }
}
