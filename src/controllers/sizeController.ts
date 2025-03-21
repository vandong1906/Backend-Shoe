// controllers/sizeController.ts
import { Request, Response } from "express";
import sizeService from "../services/sizeService";

class SizeController {
    async createSize(req: Request, res: Response) {
        try {
            const { size_value, size_system, description } = req.body;
            const size = await sizeService.createSize({ size_value, size_system, description });
            res.status(201).json({ message: "Size created", data: size });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async getAllSizes(req: Request, res: Response) {
        try {
            const sizes = await sizeService.getAllSizes();
            res.status(200).json({ message: "Sizes retrieved", data: sizes });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}

export default new SizeController();