// controllers/orderController.ts
import { Request, Response } from "express";
import * as orderService from "../services/orderService";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { user_id, address_id, cart_items } = req.body;
        const order = await orderService.createOrder(user_id, address_id, cart_items);
        res.status(201).json(order);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Unexpected error" });
        }
    }
};

export const getOrder = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.id);
        const order = await orderService.getOrder(orderId);
        res.json(order);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(404).json({ error: "Unexpected error" });
        }
    }
};