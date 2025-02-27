// controllers/cartItemController.ts
import { Request, Response } from "express";
import * as cartItemService from "../services/cartItemService";
import * as shoppingSessionService from "../services/shoppingSessionService";

export const addToCart = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new Error("No session token");
        const session = await shoppingSessionService.getSession(token);
        const { variant_id, quantity } = req.body;
        const cartItem = await cartItemService.addToCart(session.id, variant_id, quantity);
        res.status(201).json(cartItem);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Unexpected error" });
        }
    }
};

export const getCartItems = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new Error("No session token");
        const session = await shoppingSessionService.getSession(token);
        const items = await cartItemService.getCartItems(session.id);
        res.json(items);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Unexpected error" });
        }
    }
};