// services/productVariantService.ts
import ProductVariant from "../model/productVariant";
import Color from "../model/Color";
import SKU from "../model/Sku";
import size from '../model/size'
class ProductVariantService {
    async createVariant(data: {
        product_id: number;
        size_id: string;
        color_id: number;
        sku_id: number;
        price: number;
        stock_quantity: number;
        image_url?: string;
    }) {
        try {
            const variant = await ProductVariant.create(data);
            return variant;
        } catch (error) {
            throw new Error(`Error creating variant: ${(error as Error).message}`);
        }
    }

    async getVariantsByProductId(productId: number) {
        try {
            const variants = await ProductVariant.findAll({
                where: { product_id: productId },
                include: [Color, SKU,size],
            });
            console.log(variants);
            return variants;
        } catch (error) {
            throw new Error(`Error fetching variants: ${(error as Error).message}`);
        }
    }
}

export default new ProductVariantService();