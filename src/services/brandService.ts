// services/brandService.ts
import Brand, { BrandCreationAttributes } from "../model/brand";

interface BrandInput {
    name: string;
    description?: string;
    logo_url?: string;
}

export const createBrand = async (data: BrandInput) => {
    const brandData: BrandCreationAttributes = { ...data };
    const brand = await Brand.create(brandData);
    console.log(brand);
    return brand;
};

export const getBrand = async (id: number) => {
    const brand = await Brand.findByPk(id);
    if (!brand) throw new Error("Brand not found");
    return brand;
};

export const getAllBrands = async () => {
    return await Brand.findAll({
        raw: true,
    });
};