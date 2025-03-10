"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = exports.login = exports.register = void 0;
const userService_1 = __importDefault(require("../services/userService"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService_1.default.register(req.body);
        res.status(201).json({
            message: "User registered",
            user: { id: user.id, email: user.email, role: user.role, name: user.name }
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message }); // Safe to use .message
        }
        else {
            res.status(400).json({ error: "An unknown error occurred" });
        }
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, user } = yield userService_1.default.login(req.body);
        res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
        res.json({ token, user });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message }); // Safe to use .message
        }
        else {
            res.status(400).json({ error: "An unknown error occurred" });
        }
    }
});
exports.login = login;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield userService_1.default.getProfile(((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 0);
        res.json(user);
    }
    catch (error) {
        res.status(404).json({ error });
    }
});
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield userService_1.default.updateProfile(((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 0, req.body);
        res.json({ message: "Profile updated", user: { id: user.id, email: user.email, role: user.role, name: user.name } });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.updateProfile = updateProfile;
//# sourceMappingURL=userController.js.map