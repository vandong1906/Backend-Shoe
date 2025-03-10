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
exports.getAllBrands = exports.getBrand = exports.createBrand = void 0;
// services/brandService.ts
const brand_1 = __importDefault(require("../model/brand"));
const createBrand = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const brandData = Object.assign({}, data);
    const brand = yield brand_1.default.create(brandData);
    console.log(brand);
    return brand;
});
exports.createBrand = createBrand;
const getBrand = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const brand = yield brand_1.default.findByPk(id);
    if (!brand)
        throw new Error("Brand not found");
    return brand;
});
exports.getBrand = getBrand;
const getAllBrands = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield brand_1.default.findAll({
        raw: true,
    });
});
exports.getAllBrands = getAllBrands;
//# sourceMappingURL=brandService.js.map