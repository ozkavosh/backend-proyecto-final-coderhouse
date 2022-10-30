import OrderDTO from "../dtos/OrderDTO";
import { orderDAOFactory } from "../factories/orderDAOFactory";
import logger from "../utils/logger";

let instance = null;

export default class OrderRepository {
  dao: any;

  constructor() {
    this.dao = orderDAOFactory(process.env.STORAGE || "memory");
  }

  async save(order: any) {
    try {
      const createdAt = new Date(Date.now()).toLocaleString();
      const orderNum = (await this.getAll()).length + 1;
      const newOrder = await this.dao.save({ ...order, createdAt, orderNum });
      return new OrderDTO(newOrder);
    } catch (e) {
      logger.error(e);
      return { errors: "Error saving order" };
    }
  }

  static getInstance(){
    if(!instance){
      instance = new OrderRepository();
      return instance;
    }
    return instance;
  }

  async getAll() {
    try {
      const orders = await this.dao.getAll();
      return orders.map((order: any) => new OrderDTO(order));
    } catch (e) {
      logger.error(e);
      return { error: "Error fetching orders" };
    }
  }

  async getById(id: string) {
    try {
      const order = await this.dao.getById(id);
      if (order) {
        return new OrderDTO(order);
      }
      return { errors: "Order not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error fetching order" };
    }
  }

  async getByEmail(email: string) {
    try {
      const orders = await this.getAll();
      const userOrders = orders.filter((cart: any) => cart.email === email);
      if (userOrders) {
        return userOrders.map(order => new OrderDTO(order));
      }
      return { errors: "Orders not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error fetching order" };
    }
  }

  async update(id: string, updatedOrder: Object) {
    try {
      const order = await this.dao.update(id, updatedOrder);
      if (order) {
        return new OrderDTO(order);
      }
      return { errors: "Order not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error updating order" };
    }
  }

  async deleteById(id: string) {
    try {
      const order = await this.dao.deleteById(id);
      if (order) {
        return { success: true };
      }
      return { errors: "Order not found" };
    } catch (e) {
      logger.error(e);
      return { errors: "Error removing order" };
    }
  }

  async deleteAll() {
    try {
      await this.dao.deleteAll();
      return { success: true };
    } catch (e) {
      logger.error(e);
      return { errors: "Error removing orders" };
    }
  }
}
