// controllers/brandController.ts
import {Request, RequestHandler, Response} from "express";
import * as brandService from "../services/brandService";

interface BrandInput {
    name: string;
    description?: string;
    logo_url?: string;
}
export const createBrand: RequestHandler = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("Multer file object:", req.file);

        if (!req.file) {
            res.status(400).json({ error: "File is required" });
            return;
        }
        console.log("Multer file object:", req.file);

        const { name, description } = req.body;
        const logo_url = req.file.path  // Cloudinary URL

        const brandData = {
            name,
            description,
            logo_url,
        };

        const brand = await brandService.createBrand(brandData);
        res.status(201).json(brand); // ✅ No return statement
    } catch (error) {
        console.error("Error creating brand:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getBrand = async (req: Request, res: Response) => {
    try {
        const brandId = parseInt(req.params.id);
        const brand = await brandService.getBrand(brandId);
        res.json(brand);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(404).json({ error: "Unexpected error" });
        }
    }
};

export const getAllBrands = async (req: Request, res: Response) => {
    try {
        const brands = await brandService.getAllBrands();
        console.log(brands);
        res.json(brands);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Unexpected error" });
        }
    }
};