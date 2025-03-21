// controllers/shoppingSessionController.ts
import { Request, Response } from "express";
import * as shoppingSessionService from "../services/shoppingSessionService";

export const getOrCreateSession = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token || `session-${Date.now()}`;
        const userId = req.body.user_id;
        const session = await shoppingSessionService.getOrCreateSession(token, userId);
        if (!req.cookies.token) res.cookie("token", token, { httpOnly: true });
        res.json(session);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Unexpected error" });
        }
    }
};

export const getSession = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new Error("No session token provided");
        const session = await shoppingSessionService.getSession(token);
        res.json(session);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(404).json({ error: "Unexpected error" });
        }
    }
};