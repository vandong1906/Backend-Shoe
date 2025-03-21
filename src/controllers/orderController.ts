// controllers/orderController.ts
import {NextFunction, Request, Response} from "express";
import * as orderService from "../services/orderService";

interface request extends Request {
    order?:{
        id : number
    }
    user?:{
        id:number,
        role:string
    }
}
export const createOrder = async (req: Request, res: Response) => {
    try {
        const { userId, address_id, cart_items } = req.body;

        const order = await orderService.createOrder(userId, address_id, cart_items);

       res.json(order).status(200);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        res.status(400).json({ error: "Unexpected error" });
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
export  const checkOrder = async (req: request, res: Response, next: NextFunction): Promise<void> => {
    const { orderId } = req.body;


    const order = await orderService.findOrderById(orderId);
    if (!order) {
        res.status(400).json({ error: 'Order does not exist' });

    }

    req.order = order;
    next();
};