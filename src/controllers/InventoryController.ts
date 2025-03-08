import { Request, Response } from "express";
import { stockIn, stockOut, getStock, checkout } from "../services/inventoryService";

export const stockInController = async (req: Request, res: Response) => {
    const { product_id, quantity, supplier } = req.body;
    try {
        await stockIn(product_id, quantity, supplier);
        res.status(200).json({ message: "Nhập kho thành công" });
    } catch (error: any) {
        console.error(error);
        res.status(error.message === "Sản phẩm không tồn tại" ? 404 : 500).json({ message: error.message });
    }
};

export const stockOutController = async (req: Request, res: Response) => {
    const { product_id, quantity, reason } = req.body;
    try {
        await stockOut(product_id, quantity, reason);
        res.status(200).json({ message: "Xuất kho thành công" });
    } catch (error: any) {
        console.error(error);
        res.status(error.message === "Không đủ hàng trong kho" ? 400 : 500).json({ message: error.message });
    }
};

export const getStockController = async (req: Request, res: Response) => {
    const { product_id } = req.params;
    try {
        const stock = await getStock(parseInt(product_id));
        res.status(200).json({ product_id: parseInt(product_id), quantity: stock });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi kiểm tra kho" });
    }
};

export const checkoutController = async (req: Request, res: Response) => {
    const { product_id, quantity } = req.body;
    try {
        await checkout(product_id, quantity);
        res.status(200).json({ message: "Đặt hàng thành công" });
    } catch (error: any) {
        console.error(error);
        res.status(error.message === "Hết hàng" ? 400 : 500).json({ message: error.message });
    }
};