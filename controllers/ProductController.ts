import type { Request, Response } from "express";
import type ProductService from "../services/ProductService";

export default class ProductController {
  service: ProductService;

  constructor(service: ProductService) {
    this.service = service;
  }

  async postProduct(req: Request, res: Response) {
    const product = req.body;
    if (product) {
      const newProduct = await this.service.save(product);
      if (!("errors" in newProduct)) {
        return res.json(newProduct);
      } else {
        return res.status(402).json(newProduct);
      }
    }
    return res.status(402).json({ error: "Missing request body" });
  }

  async getProducts(req: Request, res: Response) {
    const products = await this.service.getAll();
    if (products) {
      return res.json(products);
    }
    return res.status(500).json({ error: "Server error" });
  }

  async getProduct(req: Request, res: Response) {
    const id = req.params.id;
    if (id) {
      const product = await this.service.getById(id);
      if (!("errors" in product)) {
        return res.json(product);
      } else {
        return res.status(402).json(product);
      }
    }
    return res
      .status(402)
      .json({ error: "Missing product id" });
  }

  async putProduct(req: Request, res: Response) {
    const id = req.params.id;
    const product = req.body;
    if (product && id) {
      const newProduct = await this.service.update(id, product);
      if (!("errors" in newProduct)) {
        return res.json(newProduct);
      } else {
        return res.status(402).json(newProduct);
      }
    }
    return res
      .status(402)
      .json({ error: "Missing request body or product id" });
  }

  async deleteProduct(req: Request, res: Response) {
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
      .json({ error: "Missing product id" });
  }

  async deleteProducts(req: Request, res: Response){
    res.json(await this.service.deleteAll());
  }
}
