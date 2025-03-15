import e, { Request, Response } from "express";
import userService from "../services/userService";
import jwt from "jsonwebtoken";
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
        // Validate input
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Email and password are required" });
        }


        const {accessToken,refreshToken,user}  = await userService.login({ email, password });

        res.cookie("token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 60 * 1000, // 15 minutes
            sameSite: "strict"
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "strict"
        });

        // user data without sensitive info
        const userResponse = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        res.status(200).json({ 
            message: "Login successful",
            user: userResponse 
        });

    } catch (error: unknown) {
        // Type-specific error handling
        if (error instanceof Error) {
            if (error.message === "Invalid credentials") {
                res.status(401).json({ error: "Invalid email or password" });
            }
            res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal server error" });
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
export const logout = async (req: Request, res: Response) => {
    try {
        // Clear the access token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        // Clear the refresh token cookie
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        // If you're storing refresh tokens in a database, you could invalidate it here
        // Example: await invalidateRefreshToken(req.cookies.refreshToken);

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: "Logout failed" });
    }
};