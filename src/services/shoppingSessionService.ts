// services/shoppingSessionService.ts
import ShoppingSession from "../model/shoppingSession";

export const getOrCreateSession = async (token: string, userId?: number) => {
    let session = await ShoppingSession.findOne({ where: { token } });
    if (!session) {
        session = await ShoppingSession.create({ token, user_id: userId });
    }
    return session;
};

export const getSession = async (token: string) => {
    const session = await ShoppingSession.findOne({ where: { token } });
    if (!session) throw new Error("Session not found");
    return session;
};