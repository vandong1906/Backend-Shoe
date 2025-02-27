// services/addressService.ts
import Address, {AddressCreationAttributes} from "../model/address";

interface AddressInput {
    street: string;
    city: string;
    state?: string;
    postal_code: string;
    country: string;
    is_default: boolean;
}

export const createAddress = async (userId: number, data: AddressInput) => {
    const addressData = { user_id: userId, ...data };
    const address = await Address.create(addressData);
    return address;
};

export const getAddresses = async (userId: number) => {
    return await Address.findAll({ where: { user_id: userId } });
};