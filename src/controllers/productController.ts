// controllers/productController.ts
import { Request, Response } from "express";
import * as productService from "../services/productService";
import product from "../model/product";
import ProductVariant from "../model/productVariant";

interface request extends Request{
    user?: {
        id: number;
        role: string;
    };
}
export const createProduct = async (req: request, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized" });
        }
        const role = req.user?.role;
        if(role!='admin') {
             res.status(401).json({ error: "Unauthorized" });
        }
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

        res.json(product).status(200);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(404).json({ error: "Unexpected error" });
        }
    }
};

export const getProductsWithPagination = async (req:Request, res:Response) => {
    const page: number = Number(req.query.page) || 1;
    const size: number = Number(req.query.size) || 10;
    const offset: number = (page - 1) * size;
    try {

        const products = await product.findAndCountAll({
            limit: size,
            offset: offset,
            order: [['createdAt', 'DESC']],
            include:ProductVariant
        });
        res.status(200).json({
            total: products.count,
            pages: Math.ceil(products.count / size),
            currentPage: page,
            products: products.rows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAll =async (req: Request, res: Response) => {
    try {
        const product =await productService.getAll();
        res.status(200).json(product);
    }
    catch (error: unknown) {
        res.status(500).json({ error: "Internal server error" });
    }
}