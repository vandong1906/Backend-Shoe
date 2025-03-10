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
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyStockUpdate = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
const initSocket = (server) => {
    io = new socket_io_1.Server(server);
    io.on("connection", (socket) => {
        console.log("Một client đã kết nối:", socket.id);
        socket.on("disconnect", () => {
            console.log("Client đã ngắt kết nối:", socket.id);
        });
    });
};
exports.initSocket = initSocket;
const notifyStockUpdate = (product_id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    io.emit("stockUpdate", { product_id, quantity });
});
exports.notifyStockUpdate = notifyStockUpdate;
//# sourceMappingURL=socket.js.map