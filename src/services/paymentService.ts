// services/paymentService.ts
import Payment from "../model/payment";

export const createPayment = async (data: { order_id: number; amount: number; payment_method: string; transaction_id?: string }) => {
    return await Payment.create({ ...data, status: "pending" });
};

export const updatePaymentStatus = async (id: number, status: "completed" | "failed") => {
    const payment = await Payment.findByPk(id);
    if (!payment) throw new Error("Payment not found");
    await payment.update({ status });
    return payment;
};