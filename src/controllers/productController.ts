// controllers/productController.ts
import { Request, Response } from "express";
import * as productService from "../services/productService";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Unexpected error" });
        }
    }
};

export const getProduct = async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await productService.getProduct(productId);
        res.json(product);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(404).json({ error: "Unexpected error" });
        }
    }
};