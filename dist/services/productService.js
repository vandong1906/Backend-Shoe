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
exports.getAll = exports.getProduct = exports.createProduct = void 0;
// services/productService.ts
const product_1 = __importDefault(require("../model/product"));
const productVariant_1 = __importDefault(require("../model/productVariant"));
const createProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_1.default.create(data);
});
exports.createProduct = createProduct;
const getProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (id <= 0 || !Number.isInteger(id)) {
        throw new Error("Invalid product ID");
    }
    const productData = yield product_1.default.findOne({
        where: { id },
        include: productVariant_1.default,
        raw: true
    });
    if (!productData) {
        throw new Error("Product not found");
    }
    return productData; // Trả về dữ liệu thô
});
exports.getProduct = getProduct;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_1.default.findAll();
});
exports.getAll = getAll;
//# sourceMappingURL=productService.js.map