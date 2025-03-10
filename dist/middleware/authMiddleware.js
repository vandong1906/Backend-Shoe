"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        res.status(401).json({ error: "No token provided" });
    else {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
            req.user = decoded;
            next();
        }
        catch (error) {
            res.status(401).json({ error: "Invalid token" });
        }
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map