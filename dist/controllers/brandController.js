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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBrands = exports.getBrand = exports.createBrand = void 0;
const brandService = __importStar(require("../services/brandService"));
const createBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Request body:", req.body);
        console.log("Multer file object:", req.file);
        if (!req.file) {
            res.status(400).json({ error: "File is required" });
            return;
        }
        console.log("Multer file object:", req.file);
        const { name, description } = req.body;
        const logo_url = req.file.path; // Cloudinary URL
        const brandData = {
            name,
            description,
            logo_url,
        };
        const brand = yield brandService.createBrand(brandData);
        res.status(201).json(brand); // ✅ No return statement
    }
    catch (error) {
        console.error("Error creating brand:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createBrand = createBrand;
const getBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brandId = parseInt(req.params.id);
        const brand = yield brandService.getBrand(brandId);
        res.json(brand);
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
exports.getBrand = getBrand;
const getAllBrands = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brands = yield brandService.getAllBrands();
        console.log(brands);
        res.json(brands);
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
exports.getAllBrands = getAllBrands;
//# sourceMappingURL=brandController.js.map