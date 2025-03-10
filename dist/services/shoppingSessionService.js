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
exports.getSession = exports.getOrCreateSession = void 0;
// services/shoppingSessionService.ts
const shoppingSession_1 = __importDefault(require("../model/shoppingSession"));
const getOrCreateSession = (token, userId) => __awaiter(void 0, void 0, void 0, function* () {
    let session = yield shoppingSession_1.default.findOne({ where: { token } });
    if (!session) {
        session = yield shoppingSession_1.default.create({ token, user_id: userId });
    }
    return session;
});
exports.getOrCreateSession = getOrCreateSession;
const getSession = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield shoppingSession_1.default.findOne({ where: { token } });
    if (!session)
        throw new Error("Session not found");
    return session;
});
exports.getSession = getSession;
//# sourceMappingURL=shoppingSessionService.js.map