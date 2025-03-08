import express, { Request, Response } from 'express';
import sequelize from "./config/db";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import routes from "./routes";
import cors from 'cors'
import { initSocket } from "./utils/socket";
import {createServer} from "http";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());

const port = 3001;
dotenv.config({ path: './src/.env' });
sequelize.sync();
const server = createServer(app);
// sequelize.sync({ force: true });
initSocket(server);
app.use(cors(
    {
        origin: 'http://localhost:5173',
        allowedHeaders: ['sessionId', 'Content-Type', 'Authorization'],
        exposedHeaders: ['sessionId'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        preflightContinue: false,
    }));
app.use("/api", routes);

app.get('/', (req: Request, res: Response) => {
    res.send('Xin chào từ Express với TypeScript!');
});

app.listen(port, () => {
    console.log(`Ứng dụng đang chạy tại http://localhost:${port}`);
});