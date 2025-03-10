"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const user_1 = __importDefault(require("../model/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const checkemail_1 = require("../utils/checkemail");
const process = __importStar(require("node:process"));
const userService = {
    register: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        const flag = (0, checkemail_1.checkemail)(userData.email);
        if (flag) {
            const existingUser = yield user_1.default.findOne({ where: { email: userData.email } });
            if (existingUser)
                throw new Error("User already exists");
            const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
            const user = yield user_1.default.create(Object.assign(Object.assign({}, userData), { password: hashedPassword, role: "user" }));
            return user;
        }
        else {
            throw new Error("Email not valid or Email already exists");
        }
    }),
    login: (credentials) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ where: { email: credentials.email } });
        if (!user || !(yield bcrypt_1.default.compare(credentials.password, user.password))) {
            throw new Error("Invalid credentials");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "", {
            expiresIn: "1h",
        });
        return { token, user: { id: user.id, email: user.email, role: user.role, name: user.name } };
    }),
    getProfile: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findByPk(userId, { attributes: { exclude: ["password"] } });
        if (!user)
            throw new Error("User not found");
        return user;
    }),
    updateProfile: (userId, updates) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findByPk(userId);
        if (!user)
            throw new Error("User not found");
        if (updates.password) {
            updates.password = yield bcrypt_1.default.hash(updates.password, 10);
        }
        yield user.update(updates);
        return user;
    }),
};
exports.default = userService;
//# sourceMappingURL=userService.js.map