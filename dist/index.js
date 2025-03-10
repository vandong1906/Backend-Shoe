"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
const port = 3000;
dotenv_1.default.config({ path: './src/.env' });
db_1.default.sync();
const server = (0, http_1.createServer)(app);
// sequelize.sync({ force: true });
// initSocket(server);
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    allowedHeaders: ['sessionId', 'Content-Type', 'Authorization'],
    exposedHeaders: ['sessionId'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    preflightContinue: false,
}));
app.use("/api", routes_1.default);
app.get('/', (req, res) => {
    res.send('Xin chào từ Express với TypeScript!');
});
app.listen(port, () => {
    console.log(`Ứng dụng đang chạy tại http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map