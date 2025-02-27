// services/productVariantService.ts
import ProductVariant from "../model/productVariant";

export const createVariant = async (data: { product_id: number; size: string; color: string; price: number; stock_quantity: number; sku: string; image_url?: string }) => {
    return await ProductVariant.create(data);
};

export const getVariant = async (id: number) => {
    const variant = await ProductVariant.findByPk(id);
    if (!variant) throw new Error("Variant not found");
    return variant;
};