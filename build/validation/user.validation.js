"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUserId = exports.SchemaUser = void 0;
const zod_1 = require("zod");
exports.SchemaUser = zod_1.z.object({
    firstname: zod_1.z.string(),
    lastname: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phone: zod_1.z.number().min(111111111).max(999999999),
    birthday: zod_1.z.date(),
});
exports.SchemaUserId = zod_1.z.object({
    id: zod_1.z.string().min(15).max(100)
});
