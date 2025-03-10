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
exports.updatePaymentStatus = exports.createPayment = void 0;
// services/paymentService.ts
const payment_1 = __importDefault(require("../model/payment"));
const createPayment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield payment_1.default.create(Object.assign(Object.assign({}, data), { status: "pending" }));
});
exports.createPayment = createPayment;
const updatePaymentStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield payment_1.default.findByPk(id);
    if (!payment)
        throw new Error("Payment not found");
    yield payment.update({ status });
    return payment;
});
exports.updatePaymentStatus = updatePaymentStatus;
//# sourceMappingURL=paymentService.js.map