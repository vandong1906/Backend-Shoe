// services/productService.ts
import Product from "../model/product";
import ProductVariant from "../model/productVariant";


export const createProduct = async (data: { name: string; brand_id: number; description?: string; base_price: number, stock:number}) => {
    return await Product.create(data);
};

export const getProduct = async (id: number) => {

    if (id <= 0 || !Number.isInteger(id)) {
        throw new Error("Invalid product ID");
    }

    const productData = await Product.findOne({
        where: { id },
        include:ProductVariant// Sử dụng shorthand property
    });

    if (!productData) {
        throw new Error("Product not found");
    }

    return productData.get({ plain: true });// Trả về dữ liệu thô
};

export const getAll = async ()=>{
    return await Product.findAll();
}