import ProductRepository from "../repositories/ProductRepository";
import ProductService from "../services/ProductService";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

const productExists = async (productId: any) => {
    const result: any = await productService.getById(productId);
    return result.errors ? false : true;
}

export default productExists;