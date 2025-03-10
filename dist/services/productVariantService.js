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
exports.getVariant = exports.createVariant = void 0;
// services/productVariantService.ts
const productVariant_1 = __importDefault(require("../model/productVariant"));
const createVariant = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productVariant_1.default.create(data);
});
exports.createVariant = createVariant;
const getVariant = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const variant = yield productVariant_1.default.findByPk(id);
    if (!variant)
        throw new Error("Variant not found");
    return variant;
});
exports.getVariant = getVariant;
//# sourceMappingURL=productVariantService.js.map