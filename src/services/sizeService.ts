// services/sizeService.ts
import Size from "../model/size";

class SizeService {
    async createSize(data: { size_value: number; size_system: string; description?: string }) {
        try {
            const size = await Size.create(data);
            return size;
        } catch (error) {
            throw new Error(`Error creating size: ${(error as Error).message}`);
        }
    }

    async getAllSizes() {
        try {
            const sizes = await Size.findAll();
            return sizes;
        } catch (error) {
            throw new Error(`Error fetching sizes: ${(error as Error).message}`);
        }
    }
}

export default new SizeService();