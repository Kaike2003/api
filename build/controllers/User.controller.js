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
const user_validation_1 = require("../validation/user.validation");
const User_repository_1 = __importDefault(require("../respository/User.repository"));
class UserController extends User_repository_1.default {
    constructor() {
        super();
    }
    create(req, res) {
        const _super = Object.create(null, {
            createUser: { get: () => super.createUser }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { firstname, lastname, email, phone, birthday } = req.body;
            user_validation_1.SchemaUser.parseAsync({
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: Number(phone),
                birthday: new Date(birthday)
            }).then((success) => __awaiter(this, void 0, void 0, function* () {
                return yield _super.createUser.call(this, res, success);
            })).catch((error) => {
                res.status(400).json(error);
            });
        });
    }
    get(req, res) {
        const _super = Object.create(null, {
            getUser: { get: () => super.getUser }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getUser.call(this, res);
        });
    }
    delete(req, res) {
        const _super = Object.create(null, {
            deleteUser: { get: () => super.deleteUser }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            user_validation_1.SchemaUserId.parseAsync({
                id: id
            }).then((success) => __awaiter(this, void 0, void 0, function* () {
                return yield _super.deleteUser.call(this, res, success);
            })).catch((error) => {
                res.status(400).json(error);
            });
        });
    }
}
exports.default = UserController;
