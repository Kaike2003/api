import { Request, Response } from "express";
import UserRepository from "../respository/User.repository";
import { SchemaUserCreate, SchemaUserId, SchemaUserUpdate, TSchemaUserCreate, TSchemaUserUpdate } from "../validation/user/user.validation";


class UserController extends UserRepository {

    constructor() {
        super()
    }

    protected async create(req: Request, res: Response) {

        const { firstname, lastname, email, phone, birthday }: TSchemaUserCreate = req.body

        SchemaUserCreate.parseAsync({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: Number(phone),
            birthday: new Date(birthday)
        }).then(async (success) => {

            return await super.createUser(res, success)

        }).catch((error) => {
            res.status(400).json(error)
        })

    }

    protected async findUnique(req: Request, res: Response) {

        const { id } = req.params

        SchemaUserId.parseAsync({
            id: id
        }).then(async (success) => {
            return await super.finUniqueUser(res, success)
        }).catch((error) => {
            res.status(400).json(error)
        })

    }

    protected async findAll(req: Request, res: Response) {

        return await super.findAllUser(res)

    }

    protected async remove(req: Request, res: Response) {

        const { id } = req.params

        SchemaUserId.parseAsync({
            id: id
        }).then(async (success) => {
            return await super.removeUser(res, success)
        }).catch((error) => {
            res.status(400).json(error)
        })

    }

    protected async update(req: Request, res: Response) {

        const { id } = req.params
        const { phone, birthday, email, firstname, lastname }: TSchemaUserUpdate = req.body

        SchemaUserUpdate.parseAsync({
            id: id,
            phone: Number(phone),
            birthday: new Date(birthday),
            email: email,
            firstname: firstname,
            lastname: lastname
        }).then(async (success) => {
            return await super.updateUser(res, success)
        }).catch((error) => {
            res.status(400).json(error)
        })

    }

}


export default UserController