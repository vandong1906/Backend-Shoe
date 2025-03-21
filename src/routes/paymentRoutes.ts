import express, { Request, Response } from 'express';
import { vnp_Url, vnp_ReturnUrl, vnp_TmnCode, vnp_HashSecret } from '../config/vnpay-config';
import { sortObject, createHash, formatDate } from '../utils/helpers';
import { createPayment, updatePaymentStatus } from '../services/paymentService';
import {checkOrder} from "../controllers/orderController";
import {authMiddleware} from "../middleware/authMiddleware";

const router = express.Router();

interface VnpParams {
    vnp_Version: string;
    vnp_Command: string;
    vnp_TmnCode: string;
    vnp_Amount: number;
    vnp_CurrCode: string;
    vnp_TxnRef: string;
    vnp_OrderInfo: string;
    vnp_OrderType: string;
    vnp_Locale: string;
    vnp_ReturnUrl: string;
    vnp_IpAddr: string;
    vnp_CreateDate: string;
    [key: string]: string | number;
}

router.post('/create-payment',authMiddleware,checkOrder, async (req: Request, res: Response) => {
    try {
        if (!vnp_TmnCode || !vnp_HashSecret) {
            res.status(500).json({ error: 'VNPay configuration is missing' });
        }

        if (!req.body.orderInfo || !req.body.amount || !req.body.orderId) {
            res.status(400).json({ error: 'Missing required parameters' });
        }

            const { orderInfo, amount, orderId } = req.body;
console.log(req.body);
        const payment = await createPayment({
            order_id: orderId,
            amount: parseInt(amount),
            payment_method: 'VNPay',
            transaction_id:orderInfo
        });
        const orderInfoFormatted = orderInfo.replace(/\s+/g, '+');
        const createDate = formatDate(new Date());

        const vnp_Params: VnpParams = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: vnp_TmnCode ?? "",
            vnp_Amount: parseInt(amount) * 100,
            vnp_CurrCode: 'VND',
            vnp_TxnRef: payment.id.toString(),
            vnp_OrderInfo: orderInfoFormatted,
            vnp_OrderType: 'other',
            vnp_Locale: 'vn',
            vnp_ReturnUrl: vnp_ReturnUrl,
            vnp_IpAddr: '127.0.0.1',
            vnp_CreateDate: createDate,
        };

        const signData = Object.keys(vnp_Params)
            .sort()
            .map(key => `${key}=${(vnp_Params as Record<string, any>)[key]}`)
            .join('&');

        const secureHash = createHash(signData, vnp_HashSecret ??'');
        const paymentUrl = `${vnp_Url}?${signData}&vnp_SecureHash=${secureHash}`;

        res.json({ paymentUrl });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/payment-result', async (req: Request, res: Response) => {
    try {
        // Kiểm tra nếu không có query params
        if (!Object.keys(req.query).length) {
            res.status(400).json({ error: 'Thiếu tham số thanh toán' });
        }

        // Chuyển query params thành object
        const vnp_Params = { ...(req.query as Record<string, string>) };
        const secureHash = vnp_Params.vnp_SecureHash as string;

        delete vnp_Params.vnp_SecureHash;
        delete vnp_Params.vnp_SecureHashType;

        // Sắp xếp tham số theo thứ tự
        const sortedParams = sortObject(vnp_Params);
        const signData = new URLSearchParams(
            Object.entries(sortedParams).map(([key, value]) => [key, String(value)])
        ).toString();

        // Tạo hash để kiểm tra
        const checkHash = createHash(signData, vnp_HashSecret ?? '');

        if (secureHash !== checkHash) {
            res.status(400).json({ error: 'Invalid signature' });
        }

        const paymentId = parseInt(vnp_Params.vnp_TxnRef as string);
        const responseCode = vnp_Params.vnp_ResponseCode as string;

        // Cập nhật trạng thái thanh toán trong DB
        if (responseCode === '00') {
            await updatePaymentStatus(paymentId, 'completed');
            res.json({ message: 'Thanh toán thành công!' });
        } else {
            await updatePaymentStatus(paymentId, 'failed');
            res.json({ error: `Thanh toán thất bại! Mã lỗi: ${responseCode}` });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
