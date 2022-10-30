import ProductRepository from "../repositories/ProductRepository";
import isValidProduct from "../utils/yup-schemas/productSchema";
import logger from "../utils/logger";

let instance = null;

export default class ProductService {
  repository: ProductRepository;

  constructor(repository: ProductRepository) {
    this.repository = repository;
  }

  async save(object: Object) {
    try {
      await isValidProduct(object);
      return await this.repository.save(object);
    } catch (e: any) {
      logger.debug("Errors saving product: " + e.errors.join(" - "));
      return { errors: e.errors.join(" - ") };
    }
  }

  static getInstance(repository) {
    if (!instance) {
      instance = new ProductService(repository);
      return instance;
    }
    return instance;
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getById(id: string) {
    if (typeof id !== "string")
      return { errors: "Product id must be a string" };
    return await this.repository.getById(id);
  }

  async update(id: string, object: Object) {
    try {
      await isValidProduct(object);
      return await this.repository.update(id, object);
    } catch (e: any) {
      logger.debug("Errors updating product: " + e.errors.join(" - "));
      return { errors: e.errors.join(" - ") };
    }
  }

  async deleteById(id: string) {
    if (typeof id !== "string")
      return { errors: "Product id must be a string" };
    return await this.repository.deleteById(id);
  }

  async deleteAll() {
    return await this.repository.deleteAll();
  }
}
