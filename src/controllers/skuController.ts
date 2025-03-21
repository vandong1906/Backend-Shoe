// controllers/skuController.ts
import { Request, Response } from "express";
import skuService from "../services/skuService";

class SKUController {

    async createSKU(req: Request, res: Response) {
        try {
            const { code } = req.body;
            const sku = await skuService.createSKU(code);
            res.status(201).json({ message: "SKU created", data: sku });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async getAllSKUs(req: Request, res: Response) {
        try {
            const skus = await skuService.getAllSKUs();
            res.status(200).json({ message: "SKUs retrieved", data: skus });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}

export default new SKUController();