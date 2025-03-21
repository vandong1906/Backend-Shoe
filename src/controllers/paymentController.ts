// controllers/paymentController.ts
import { Request, Response } from "express";
import * as paymentService from "../services/paymentService";

export const createPayment = async (req: Request, res: Response) => {
    try {
        const payment = await paymentService.createPayment(req.body);
        res.json(payment).status(200);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Unexpected error" });
        }
    }
};

export const updatePaymentStatus = async (req: Request, res: Response) => {
    try {
        const paymentId = parseInt(req.params.id);
        const { status } = req.body;
        const payment = await paymentService.updatePaymentStatus(paymentId, status);
        res.json(payment);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Unexpected error" });
        }
    }
};