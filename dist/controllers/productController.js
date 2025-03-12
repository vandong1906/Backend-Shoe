"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.getAll = exports.getProductsWithPagination = exports.getProduct = exports.createProduct = void 0;
const productService = __importStar(require("../services/productService"));
const product_1 = __importDefault(require("../model/product"));
const productVariant_1 = __importDefault(require("../model/productVariant"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productService.createProduct(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: "Unexpected error" });
        }
    }
});
exports.createProduct = createProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = parseInt(req.params.id);
        const product = yield productService.getProduct(productId);
        res.json(product).status(200);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(404).json({ error: "Unexpected error" });
        }
    }
});
exports.getProduct = getProduct;
const getProductsWithPagination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 10;
    const offset = (page - 1) * size;
    try {
        const products = yield product_1.default.findAndCountAll({
            limit: size,
            offset: offset,
            order: [['createdAt', 'DESC']],
            include: productVariant_1.default
        });
        res.status(200).json({
            total: products.count,
            pages: Math.ceil(products.count / size),
            currentPage: page,
            products: products.rows,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getProductsWithPagination = getProductsWithPagination;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productService.getAll();
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAll = getAll;
//# sourceMappingURL=productController.js.map