"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vnpay_config_1 = require("../config/vnpay-config");
const helpers_1 = require("../utils/helpers");
const paymentService_1 = require("../services/paymentService");
const router = express_1.default.Router();
router.post('/create-payment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!vnpay_config_1.vnp_TmnCode || !vnpay_config_1.vnp_HashSecret) {
            res.status(500).json({ error: 'VNPay configuration is missing' });
        }
        if (!req.body.orderInfo || !req.body.amount || !req.body.orderId) {
            res.status(400).json({ error: 'Missing required parameters' });
        }
        const { orderInfo, amount, orderId } = req.body;
        const payment = yield (0, paymentService_1.createPayment)({
            order_id: orderId,
            amount: parseInt(amount),
            payment_method: 'VNPay',
            transaction_id: orderInfo
        });
        const orderInfoFormatted = orderInfo.replace(/\s+/g, '+');
        const createDate = (0, helpers_1.formatDate)(new Date());
        const vnp_Params = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: vnpay_config_1.vnp_TmnCode !== null && vnpay_config_1.vnp_TmnCode !== void 0 ? vnpay_config_1.vnp_TmnCode : "",
            vnp_Amount: parseInt(amount) * 100,
            vnp_CurrCode: 'VND',
            vnp_TxnRef: payment.id.toString(),
            vnp_OrderInfo: orderInfoFormatted,
            vnp_OrderType: 'other',
            vnp_Locale: 'vn',
            vnp_ReturnUrl: vnpay_config_1.vnp_ReturnUrl,
            vnp_IpAddr: '127.0.0.1',
            vnp_CreateDate: createDate,
        };
        const signData = Object.keys(vnp_Params)
            .sort()
            .map(key => `${key}=${vnp_Params[key]}`)
            .join('&');
        const secureHash = (0, helpers_1.createHash)(signData, vnpay_config_1.vnp_HashSecret !== null && vnpay_config_1.vnp_HashSecret !== void 0 ? vnpay_config_1.vnp_HashSecret : '');
        const paymentUrl = `${vnpay_config_1.vnp_Url}?${signData}&vnp_SecureHash=${secureHash}`;
        res.json({ paymentUrl }); // Luôn res.json()
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get('/payment-result', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Kiểm tra nếu không có query params
        if (!Object.keys(req.query).length) {
            res.status(400).json({ error: 'Thiếu tham số thanh toán' });
        }
        // Chuyển query params thành object
        const vnp_Params = Object.assign({}, req.query);
        const secureHash = vnp_Params.vnp_SecureHash;
        delete vnp_Params.vnp_SecureHash;
        delete vnp_Params.vnp_SecureHashType;
        // Sắp xếp tham số theo thứ tự
        const sortedParams = (0, helpers_1.sortObject)(vnp_Params);
        const signData = new URLSearchParams(Object.entries(sortedParams).map(([key, value]) => [key, String(value)])).toString();
        // Tạo hash để kiểm tra
        const checkHash = (0, helpers_1.createHash)(signData, vnpay_config_1.vnp_HashSecret !== null && vnpay_config_1.vnp_HashSecret !== void 0 ? vnpay_config_1.vnp_HashSecret : '');
        if (secureHash !== checkHash) {
            res.status(400).json({ error: 'Invalid signature' });
        }
        const paymentId = parseInt(vnp_Params.vnp_TxnRef);
        const responseCode = vnp_Params.vnp_ResponseCode;
        // Cập nhật trạng thái thanh toán trong DB
        if (responseCode === '00') {
            yield (0, paymentService_1.updatePaymentStatus)(paymentId, 'completed');
            res.json({ message: 'Thanh toán thành công!' });
        }
        else {
            yield (0, paymentService_1.updatePaymentStatus)(paymentId, 'failed');
            res.json({ error: `Thanh toán thất bại! Mã lỗi: ${responseCode}` });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
//# sourceMappingURL=paymentRoutes.js.map