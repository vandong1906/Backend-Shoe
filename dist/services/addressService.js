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
exports.getAddresses = exports.createAddress = void 0;
// services/addressService.ts
const address_1 = __importDefault(require("../model/address"));
const createAddress = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const addressData = Object.assign({ user_id: userId }, data);
    const address = yield address_1.default.create(addressData);
    return address;
});
exports.createAddress = createAddress;
const getAddresses = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield address_1.default.findAll({ where: { user_id: userId } });
});
exports.getAddresses = getAddresses;
//# sourceMappingURL=addressService.js.map