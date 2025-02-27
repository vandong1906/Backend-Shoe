// controllers/orderItemController.ts
import { Request, Response } from "express";
import * as orderItemService from "../services/orderItemService";

export const createOrderItem = async (req: Request, res: Response) => {
    try {
        const orderItem = await orderItemService.createOrderItem(req.body);
        res.status(201).json(orderItem);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Unexpected error" });
        }
    }
};