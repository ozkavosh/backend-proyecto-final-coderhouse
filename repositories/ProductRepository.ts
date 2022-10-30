import ProductDTO from "../dtos/ProductDTO";
import { productDAOFactory } from "../factories/productDAOFactory";
import logger from "../utils/logger";

let instance = null;

export default class ProductRepository {
  dao: any;

  constructor() {
    this.dao = productDAOFactory(process.env.STORAGE || "memory");
  }

  async save(product: Object) {
    try {
      const newProduct = await this.dao.save(product);
      return new ProductDTO(newProduct);
    } catch (e) {
      logger.error(e);
      return { errors: "Error saving product" };
    }
  }

  static getInstance(){
    if(!instance){
      instance = new ProductRepository();
      return instance;
    }
    return instance;
  }

  async getAll() {
    try {
      const products = await this.dao.getAll();
      return products.map((product: any) => new ProductDTO(product));
    } catch (e) {
      logger.error(e);
      return { error: "Error fetching products" };
    }
  }

  async getById(id: string) {
    try {
      const product = await this.dao.getById(id);
      if (product) {
        return new ProductDTO(product);
      }
      return { errors: "Product not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error fetching product" };
    }
  }

  async update(id: string, updatedProduct: Object){
    try {
      const product = await this.dao.update(id, updatedProduct);
      if (product) {
        return new ProductDTO(product);
      }
      return { errors: "Product not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error updating product" };
    }
  }

  async deleteById(id: string){
    try {
      const product = await this.dao.deleteById(id);
      if (product) {
        return { success: true };
      }
      return { errors: "Product not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error removing product" };
    }
  }

  async deleteAll(){
    try {
      await this.dao.deleteAll();
      return { success: true };
    } catch (e) {
      logger.error(e);
      return { errors: "Error removing products" };
    }
  }
}
