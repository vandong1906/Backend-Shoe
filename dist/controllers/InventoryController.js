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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutController = exports.getStockController = exports.stockOutController = exports.stockInController = void 0;
const inventoryService_1 = require("../services/inventoryService");
const stockInController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, quantity, supplier } = req.body;
    try {
        yield (0, inventoryService_1.stockIn)(product_id, quantity, supplier);
        res.status(200).json({ message: "Nhập kho thành công" });
    }
    catch (error) {
        console.error(error);
        res.status(error.message === "Sản phẩm không tồn tại" ? 404 : 500).json({ message: error.message });
    }
});
exports.stockInController = stockInController;
const stockOutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, quantity, reason } = req.body;
    try {
        yield (0, inventoryService_1.stockOut)(product_id, quantity, reason);
        res.status(200).json({ message: "Xuất kho thành công" });
    }
    catch (error) {
        console.error(error);
        res.status(error.message === "Không đủ hàng trong kho" ? 400 : 500).json({ message: error.message });
    }
});
exports.stockOutController = stockOutController;
const getStockController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    try {
        const stock = yield (0, inventoryService_1.getStock)(parseInt(product_id));
        res.status(200).json({ product_id: parseInt(product_id), quantity: stock });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi kiểm tra kho" });
    }
});
exports.getStockController = getStockController;
const checkoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, quantity } = req.body;
    try {
        yield (0, inventoryService_1.checkout)(product_id, quantity);
        res.status(200).json({ message: "Đặt hàng thành công" });
    }
    catch (error) {
        console.error(error);
        res.status(error.message === "Hết hàng" ? 400 : 500).json({ message: error.message });
    }
});
exports.checkoutController = checkoutController;
//# sourceMappingURL=InventoryController.js.map