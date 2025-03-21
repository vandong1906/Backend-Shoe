// controllers/colorController.ts
import { Request, Response } from "express";
import colorService from "../services/colorService";

class ColorController {
    async createColor(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const color = await colorService.createColor(name);
            res.status(201).json({ message: "Color created", data: color });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async getAllColors(req: Request, res: Response) {
        try {
            const colors = await colorService.getAllColors();
            res.status(200).json({ message: "Colors retrieved", data: colors });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}

export default new ColorController();