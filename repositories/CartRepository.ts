import CartDTO from "../dtos/CartDTO";
import { cartDAOFactory } from "../factories/cartDAOFactory";
import logger from "../utils/logger";

let instance = null;

export default class CartRepository {
  dao: any;

  constructor() {
    this.dao = cartDAOFactory(process.env.STORAGE || "memory");
  }

  async save(cart: Object) {
    try {
      const createdAt = new Date(Date.now()).toLocaleString();
      const newCart = await this.dao.save({ ...cart, createdAt });
      return new CartDTO(newCart);
    } catch (e) {
      logger.error(e);
      return { errors: "Error saving cart" };
    }
  }

  static getInstance(){
    if(!instance){
      instance = new CartRepository();
      return instance;
    }
    return instance;
  }

  async getAll() {
    try {
      const carts = await this.dao.getAll();
      return carts.map((cart: any) => new CartDTO(cart));
    } catch (e) {
      logger.error(e);
      return { error: "Error fetching carts" };
    }
  }

  async getById(id: string) {
    try {
      const cart = await this.dao.getById(id);
      if (cart) {
        return new CartDTO(cart);
      }
      return { errors: "Cart not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error fetching cart" };
    }
  }

  async getByEmail(email: string) {
    try {
      const carts = await this.getAll();
      const cart = carts.find((cart: any) => cart.email === email);
      if (cart) {
        return new CartDTO(cart);
      }
      return { errors: "Cart not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error fetching cart" };
    }
  }

  async update(id: string, updatedCart: Object) {
    try {
      const cart = await this.dao.update(id, updatedCart);
      if (cart) {
        return new CartDTO(cart);
      }
      return { errors: "Cart not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error updating cart" };
    }
  }

  async addProduct(id: string, product: any) {
    try {
      const cart = await this.dao.getById(id);
      if (cart) {
        const normalizedCart = cart._doc || cart;
        const productInCart = normalizedCart.products.findIndex(
          ({ id }) => id === product.id
        );
        let updatedCartProducts = normalizedCart.products;
        if (productInCart !== -1) {
          updatedCartProducts[productInCart].quantity += product.quantity;
        } else {
          updatedCartProducts = [...updatedCartProducts, product];
        }
        const updatedCart = await this.dao.update(id, {
          ...normalizedCart,
          products: updatedCartProducts,
        });
        return new CartDTO(updatedCart);
      }
      return { errors: "Cart not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error updating cart" };
    }
  }

  async deleteProductsById(cartId: string, productId: string){
    try {
      const cart = await this.dao.getById(cartId);
      if (cart) {
        const normalizedCart = cart._doc || cart;
        const productInCart = normalizedCart.products.findIndex(
          ({ id }) => id === productId
        );
        let updatedCartProducts = normalizedCart.products;
        if (productInCart !== -1) {
          updatedCartProducts.splice(productInCart, 1);
        } else {
          return { errors: "Product not found in cart" };
        }
        const updatedCart = await this.dao.update(cartId, {
          ...normalizedCart,
          products: updatedCartProducts,
        });
        return new CartDTO(updatedCart);
      }
      return { errors: "Cart not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error updating cart" };
    }
  }

  async deleteProducts(cartId: string){
    try {
      const cart = await this.dao.getById(cartId);
      if (cart) {
        const normalizedCart = cart._doc || cart;
        const updatedCart = await this.dao.update(cartId, {
          ...normalizedCart,
          products: [],
        });
        return new CartDTO(updatedCart);
      }
      return { errors: "Cart not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error updating cart" };
    }
  }

  async deleteById(id: string) {
    try {
      const cart = await this.dao.deleteById(id);
      if (cart) {
        return { success: true };
      }
      return { errors: "Cart not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error removing cart" };
    }
  }

  async deleteAll() {
    try {
      await this.dao.deleteAll();
      return { success: true };
    } catch (e) {
      logger.error(e);
      return { errors: "Error removing carts" };
    }
  }
}
