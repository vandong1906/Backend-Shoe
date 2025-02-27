// controllers/addressController.ts
import { Request, Response } from "express";
import * as addressService from "../services/addressService";

export const createAddress = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId); // Assume authenticated
        const address = await addressService.createAddress(userId, req.body);
        res.status(201).json(address);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Unexpected error" });
        }
    }
};

export const getAddresses = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const addresses = await addressService.getAddresses(userId);
        res.json(addresses);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Unexpected error" });
        }
    }
};