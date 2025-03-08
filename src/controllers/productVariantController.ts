// controllers/productVariantController.ts
import { Request, Response } from "express";
import * as productVariantService from "../services/productVariantService";
import { uploadConfigs } from "../utils/upload";

interface VariantInput {
    product_id: number;
    size: string;
    color: string;
    price: number;
    stock_quantity: number;
    sku: string;
    image_url:string;
}

export const createVariant = async (req: Request, res: Response) => {
    try {
            const { product_id, size, color, price, stock_quantity, sku } = req.body;
            const image_url = req.file ? (req.file as any).path : '';
            const variantData: VariantInput = {
                product_id: parseInt(product_id),
                size,
                color,
                price: parseFloat(price),
                stock_quantity: parseInt(stock_quantity),
                sku,
                image_url
            };
            const variant = await productVariantService.createVariant(variantData);
            res.status(201).json(variant);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Unexpected error" });
        }
    }
};

export  const getVariant = async (req: Request, res: Response) => {
    try {
        const variantId = parseInt(req.params.id);
        const product = await productVariantService.getVariant(variantId);
        console.log(product);
        res.json(product).status(200);
    } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: "Unexpected error" });
    }
}
}