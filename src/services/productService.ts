// services/productService.ts
import Product from "../model/product";

export const createProduct = async (data: { name: string; brand_id: number; description?: string; base_price: number, }) => {
    return await Product.create(data);
};

export const getProduct = async (id: number) => {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");
    return product;
};