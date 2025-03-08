import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

export const initSocket = (server: HttpServer) => {
    io = new Server(server);
    io.on("connection", (socket) => {
        console.log("Một client đã kết nối:", socket.id);
        socket.on("disconnect", () => {
            console.log("Client đã ngắt kết nối:", socket.id);
        });
    });
};

export const notifyStockUpdate = async (product_id: number, quantity: number) => {
    io.emit("stockUpdate", { product_id, quantity });
};