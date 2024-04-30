"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const User_routes_1 = __importDefault(require("../routes/User.routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.app.use((0, cors_1.default)()).use((0, morgan_1.default)("dev")).use(express_1.default.json()).use(express_1.default.urlencoded());
    }
    routes() {
        this.app.use("/user", new User_routes_1.default().userRouter);
        this.app.get("/", (req, res) => {
            res.status(200).json("OK");
        });
    }
    listen(value) {
        this.app.listen(value, () => {
            console.log(`Servidor rodando na porta = ${value}`);
        });
    }
}
exports.default = Server;
