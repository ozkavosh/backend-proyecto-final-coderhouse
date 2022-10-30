import { Router } from "express";
import ProductService from "../services/ProductService";
import ProductController from "../controllers/ProductController";
import ProductRepository from "../repositories/ProductRepository";
import jwtAuthRoute from "../middlewares/jwtAuthRoute";

const productRepository = ProductRepository.getInstance();
const productService = ProductService.getInstance(productRepository);
const productController = new ProductController(productService);
const productRouter = Router();

productRouter.post(
  "/",
  jwtAuthRoute,
  productController.postProduct.bind(productController)
);
productRouter.get(
  "/",
  jwtAuthRoute,
  productController.getProducts.bind(productController)
);
productRouter.get(
  "/:id",
  jwtAuthRoute,
  productController.getProduct.bind(productController)
);
productRouter.put(
  "/:id",
  jwtAuthRoute,
  productController.putProduct.bind(productController)
);
productRouter.delete(
  "/:id",
  jwtAuthRoute,
  productController.deleteProduct.bind(productController)
);
productRouter.delete(
  "/",
  jwtAuthRoute,
  productController.deleteProducts.bind(productController)
);

export default productRouter;
