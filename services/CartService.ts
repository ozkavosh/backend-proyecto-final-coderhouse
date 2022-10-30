import type CartRepository from "../repositories/CartRepository";
import {isValidCart, isValidUpdatedCart} from "../utils/yup-schemas/cartSchema";
import isValidCartProduct from "../utils/yup-schemas/cartProductSchema";
import logger from "../utils/logger";
import productExists from "../utils/productExists";

let instance = null;

export default class CartService {
  repository: CartRepository;

  constructor(repository: CartRepository) {
    this.repository = repository;
  }

  static getInstance(repository){
    if(!instance){
      instance = new CartService(repository);
      return instance;
    }
    return instance;
  }

  async save(object: Object) {
    try {
      await isValidCart(object);
      return await this.repository.save(object);
    } catch (e: any) {
      logger.debug("Errors saving cart: " + e.errors.join(" - "));
      return { errors: e.errors.join(" - ") };
    }
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getById(id: string) {
    if (typeof id !== "string") return { errors: "Cart id must be a string" };
    return await this.repository.getById(id);
  }

  async getByEmail(email: string) {
    if (typeof email !== "string") return { errors: "Cart owner email must be a string" };
    return await this.repository.getByEmail(email);
  }

  async update(id: string, object: Object) {
    try {
      await isValidUpdatedCart(object);
      return await this.repository.update(id, object);
    } catch (e: any) {
      logger.debug("Errors updating cart: " + e.errors.join(" - "));
      return { errors: e.errors.join(" - ") };
    }
  }

  async addProduct(id: string, object: any, remove?: boolean) {
    try {
      if(!remove) await isValidCartProduct(object);
      const validProduct = await productExists(object.id);
      if (validProduct) {
        return await this.repository.addProduct(id, object);
      }
      return {
        errors: "Product does not exist",
      };
    } catch (e: any) {
      logger.debug("Errors adding product to cart: " + e.errors.join(" - "));
      return { errors: e.errors.join(" - ") };
    }
  }

  async removeProductById(cartId: string, productId: string){
    return await this.addProduct(cartId, {id: productId, quantity: -1}, true);
  }

  async deleteProductsById(cartId: string, productId: string){
    return await this.repository.deleteProductsById(cartId, productId);
  }

  async deleteProducts(id: string){
    return await this.repository.deleteProducts(id);
  }

  async deleteById(id: string) {
    if (typeof id !== "string") return { errors: "Cart id must be a string" };
    return await this.repository.deleteById(id);
  }

  async deleteAll() {
    return await this.repository.deleteAll();
  }
}
