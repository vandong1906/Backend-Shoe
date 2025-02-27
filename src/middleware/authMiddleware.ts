import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserRequest extends Request {
    cookies: { [key: string]: string | undefined };
    user?: { id: number; role: string }; // Type from cookie-parser
}
const authMiddleware = (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token)
       res.status(401).json({ error: "No token provided" });
    else {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as { id: number; role: string };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }

    }
};

export default authMiddleware;