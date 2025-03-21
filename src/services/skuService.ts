// services/skuService.ts
import SKU from "../model/Sku";

class SKUService {
    async createSKU(code: string) {
        try {
            return await SKU.create({code});
        } catch (error) {
            throw new Error(`Error creating SKU: ${(error as Error).message}`);
        }
    }

    async getAllSKUs() {
        try {
            return await SKU.findAll();
        } catch (error) {
            throw new Error(`Error fetching SKUs: ${(error as Error).message}`);
        }
    }
}

export default new SKUService();