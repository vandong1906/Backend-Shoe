import e, { Request, Response } from "express";
import userService from "../services/userService";
interface AuthRequest extends Request {
    user?: { id: number };
}
export const register = async (req: Request, res: Response) => {
    try {
        const user = await userService.register(req.body);
        res.status(201).json({
            message: "User registered",
            user: { id: user.id, email: user.email, role: user.role, name: user.name }
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message }); // Safe to use .message
        } else {
            res.status(400).json({ error: "An unknown error occurred" });
        }
    }
};
export const login = async (req: Request, res: Response) => {
    try {
        const { token, user } = await userService.login(req.body);
        res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
        res.json({ token, user });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message }); // Safe to use .message
        } else {
            res.status(400).json({ error: "An unknown error occurred" });
        }
    }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const user = await userService.getProfile(req.user?.id || 0);
        res.json(user);
    } catch (error) {
        res.status(404).json({ error});
    }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
    try {
        const user = await userService.updateProfile(req.user?.id || 0, req.body);
        res.json({ message: "Profile updated", user: { id: user.id, email: user.email, role: user.role, name: user.name } });
    } catch (error) {
        res.status(400).json({ error });
    }
};