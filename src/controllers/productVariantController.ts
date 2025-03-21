// controllers/productVariantController.ts
import { Request, Response } from "express";
import productVariantService from "../services/productVariantService";

class ProductVariantController {
    async createVariant(req: Request, res: Response) {
        try {
            const variantData = req.body;
            const variant = await productVariantService.createVariant(variantData);
            res.status(201).json({ message: "Variant created", data: variant });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async getVariantsByProductId(req: Request, res: Response) {
        try {
            const productId = parseInt(req.params.productId);
            const variants = await productVariantService.getVariantsByProductId(productId);
            res.status(200).json({ message: "Variants retrieved", data: variants });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}

export default new ProductVariantController();