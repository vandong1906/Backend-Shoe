// services/colorService.ts
import Color from "../model/Color";

class ColorService {
    async createColor(name: string) {
        try {
            return await Color.create({name});
        } catch (error) {
            throw new Error(`Error creating color: ${(error as Error).message}`);
        }
    }

    async getAllColors() {
        try {
            return await Color.findAll();
        } catch (error) {
            throw new Error(`Error fetching colors: ${(error as Error).message}`);
        }
    }
}

export default new ColorService();