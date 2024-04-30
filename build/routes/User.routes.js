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
const express_1 = require("express");
const User_controller_1 = __importDefault(require("../controllers/User.controller"));
class UserRoutes extends User_controller_1.default {
    constructor() {
        super();
        this.userRouter = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        const _super = Object.create(null, {
            create: { get: () => super.create },
            get: { get: () => super.get }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.userRouter.post("/create", _super.create);
            this.userRouter.get("/get", _super.get);
        });
    }
}
exports.default = UserRoutes;
