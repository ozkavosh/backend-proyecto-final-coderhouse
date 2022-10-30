import type { Request, Response } from "express";
import type OrderService from "../services/OrderService";

export default class OrderController {
  service: OrderService;

  constructor(service: OrderService) {
    this.service = service;
  }

  async postOrder(req: Request, res: Response) {
    const order = req.body;
    if (order) {
      const newOrder = await this.service.save(order);
      if (!("errors" in newOrder)) {
        return res.json(newOrder);
      } else {
        return res.status(402).json(newOrder);
      }
    }
    return res.status(402).json({ error: "Missing request body" });
  }

  async getOrders(req: Request, res: Response) {
    const orders = await this.service.getAll();
    if (orders) {
      return res.json(orders);
    }
    return res.status(500).json({ error: "Server error" });
  }

  async getOrder(req: Request, res: Response) {
    const id = req.params.id;
    if (id) {
      const order = id.includes("@") ? await this.service.getByEmail(id) : await this.service.getById(id);
      if (!("errors" in order)) {
        return res.json(order);
      } else {
        return res.status(402).json(order);
      }
    }
    return res
      .status(402)
      .json({ error: "Missing order id" });
  }

  async putOrder(req: Request, res: Response) {
    const id = req.params.id;
    const order = req.body;
    if (order && id) {
      const newOrder = await this.service.update(id, order);
      if (!("errors" in newOrder)) {
        return res.json(newOrder);
      } else {
        return res.status(402).json(newOrder);
      }
    }
    return res
      .status(402)
      .json({ error: "Missing request body or order id" });
  }

  async deleteOrder(req: Request, res: Response) {
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
      .json({ error: "Missing order id" });
  }

  async deleteOrders(req: Request, res: Response){
    res.json(await this.service.deleteAll());
  }
}
