import  dotenv from "dotenv";
import * as process from "node:process";
dotenv.config({ path: './src/.env' });


export const vnp_Url = process.env.VNP_URL
export const vnp_ReturnUrl = encodeURIComponent(process.env.VNP_CALLBACK_URL ? process.env.VNP_CALLBACK_URL : 'http://localhost:3000/payment-result');
export const vnp_TmnCode = process.env.VNP_TMNCODE;
export const vnp_HashSecret = process.env.VNP_HASHSECRET;


