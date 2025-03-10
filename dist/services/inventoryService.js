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
exports.checkout = exports.stockOut = exports.stockIn = exports.getStock = void 0;
const product_1 = __importDefault(require("../model/product"));
const Inventory_1 = __importDefault(require("../model/Inventory"));
const StockIn_1 = __importDefault(require("../model/StockIn"));
const StockOut_1 = __importDefault(require("../model/StockOut"));
const redis_1 = __importDefault(require("../utils/redis"));
const socket_1 = require("../utils/socket");
const getStock = (product_id) => __awaiter(void 0, void 0, void 0, function* () {
    const cachedStock = yield redis_1.default.get(`stock:${product_id}`);
    if (cachedStock !== null)
        return parseInt(cachedStock);
    const inventory = yield Inventory_1.default.findOne({ where: { product_id } });
    const quantity = (inventory === null || inventory === void 0 ? void 0 : inventory.quantity) || 0;
    yield redis_1.default.setEx(`stock:${product_id}`, 3600, quantity.toString());
    return quantity;
});
exports.getStock = getStock;
const stockIn = (product_id, quantity, supplier) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_1.default.findByPk(product_id);
    if (!product)
        throw new Error("Sản phẩm không tồn tại");
    yield StockIn_1.default.create({ product_id, quantity, supplier });
    const currentStock = yield (0, exports.getStock)(product_id);
    yield Inventory_1.default.upsert({ product_id, quantity: currentStock + quantity });
    yield product_1.default.update({ stock: product.stock + quantity }, { where: { id: product_id } });
    const newStock = currentStock + quantity;
    yield redis_1.default.setEx(`stock:${product_id}`, 3600, newStock.toString());
    (0, socket_1.notifyStockUpdate)(product_id, newStock);
});
exports.stockIn = stockIn;
const stockOut = (product_id, quantity, reason) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_1.default.findByPk(product_id);
    if (!product)
        throw new Error("Sản phẩm không tồn tại");
    const currentStock = yield (0, exports.getStock)(product_id);
    if (currentStock < quantity)
        throw new Error("Không đủ hàng trong kho");
    yield StockOut_1.default.create({ product_id, quantity, reason });
    yield Inventory_1.default.update({ quantity: currentStock - quantity }, { where: { product_id } });
    yield product_1.default.update({ stock: product.stock - quantity }, { where: { id: product_id } });
    const newStock = currentStock - quantity;
    yield redis_1.default.setEx(`stock:${product_id}`, 3600, newStock.toString());
    (0, socket_1.notifyStockUpdate)(product_id, newStock);
});
exports.stockOut = stockOut;
const checkout = (product_id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const currentStock = yield (0, exports.getStock)(product_id);
    if (currentStock < quantity)
        throw new Error("Hết hàng");
    yield (0, exports.stockOut)(product_id, quantity, "Bán hàng");
});
exports.checkout = checkout;
//# sourceMappingURL=inventoryService.js.map