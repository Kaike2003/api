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
const prisma_1 = require("../prisma/prisma");
class UserRepository {
    createUser(res, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseEmail = yield prisma_1.prisma.user.findUnique({
                where: {
                    email: user.email
                }
            });
            if ((responseEmail === null || responseEmail === void 0 ? void 0 : responseEmail.email) === user.email) {
                res.status(400).json(`Ja existe uma conta criada com esse email: ${user.email}`);
            }
            else {
                yield prisma_1.prisma.user.create({
                    select: {
                        id: false,
                        email: true,
                        birthday: true,
                        firstname: true,
                        lastname: true,
                        phone: true,
                    },
                    data: {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        phone: user.phone,
                        birthday: user.birthday
                    }
                }).then((success) => {
                    res.status(201).json(success);
                }).catch((error) => {
                    res.status(400).json(error);
                });
            }
        });
    }
    getUser(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield prisma_1.prisma.user.findMany({
                select: {
                    id: false,
                    email: true,
                    birthday: true,
                    firstname: true,
                    lastname: true,
                    phone: true,
                }
            });
            res.status(200).json(response);
        });
    }
    deleteUser(res, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const verify = yield prisma_1.prisma.user.findUnique({
                where: {
                    id: user.id
                }
            });
            if ((verify === null || verify === void 0 ? void 0 : verify.id) === user.id) {
                yield prisma_1.prisma.user.delete({
                    where: {
                        id: user.id
                    }
                }).then((success) => {
                    return res.status(400).json(success);
                }).catch((error) => {
                    return res.status(400).json(error);
                });
            }
            else {
                res.status(400).json(`${user.id} invalido`);
            }
        });
    }
}
exports.default = UserRepository;
