import OrderRepository from "../repositories/OrderRepository";
import {
  isValidOrder,
  isValidUpdatedOrder,
} from "../utils/yup-schemas/orderSchema";
import logger from "../utils/logger";

let instance = null;

export default class OrderService {
  repository: OrderRepository;

  constructor(repository: OrderRepository) {
    this.repository = repository;
  }

  async save(object: any) {
    try {
      await isValidOrder(object);
      const status = "status" in object ? object.status : "generada";
      if (!["generada", "finalizada"].includes(status))
        return { errors: "Order status unknown" };
      return await this.repository.save({
        ...object,
        status,
      });
    } catch (e: any) {
      logger.debug("Errors saving order: " + e.errors.join(" - "));
      return { errors: e.errors.join(" - ") };
    }
  }

  static getInstance(repository) {
    if (!instance) {
      instance = new OrderService(repository);
      return instance;
    }
    return instance;
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getById(id: string) {
    if (typeof id !== "string") return { errors: "Order id must be a string" };
    return await this.repository.getById(id);
  }

  async getByEmail(email: string) {
    if (typeof email !== "string")
      return { errors: "Order owner email must be a string" };
    return await this.repository.getByEmail(email);
  }

  async update(id: string, object: any) {
    try {
      await isValidUpdatedOrder(object);
      if (!["generada", "finalizada"].includes(object.status))
        return { errors: "Order status unknown" };
      return await this.repository.update(id, object);
    } catch (e: any) {
      logger.debug("Errors updating order: " + e.errors.join(" - "));
      return { errors: e.errors.join(" - ") };
    }
  }

  async deleteById(id: string) {
    if (typeof id !== "string") return { errors: "Order id must be a string" };
    return await this.repository.deleteById(id);
  }

  async deleteAll() {
    return await this.repository.deleteAll();
  }
}
