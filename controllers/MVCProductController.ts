import type { Request, Response } from "express";
import type ProductService from "../services/ProductService";

export default class MVCProductController {
  service: ProductService;

  constructor(service) {
    this.service = service;
  }

  async renderProducts(req: Request, res: Response) {
    const products = await this.service.getAll();
    res.render("products", { products, category: "" });
  }

  async renderProductsCategory(req: Request, res: Response) {
    const category = req.params.category;
    const products = await this.service.getAll();
    const categoryProducts = products.filter((p) => p.category === category);
    res.render("products", { products: categoryProducts, category });
  }

  async renderProduct(req: Request, res: Response){
    const id = req.params.id;
    const product = await this.service.getById(id);
    const { errors } = product as { errors: string };
    res.render("product", { product, errors });
  }
}
