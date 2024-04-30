import { Request, Response } from "express"
import { SchemaProductCreate, SchemaProductId, SchemaProductUpdate, SchemaUserDeleteFind, TSchemaProductCreate, TSchemaProductId, TSchemaProductUpdate } from "../validation/product/product.validation"
import ProductRepository from "../respository/Product.repository"
import { TSchemaUserUpdate } from "../validation/user/user.validation"


class ProductController extends ProductRepository {

    constructor() {
        super()
    }

    protected async create(req: Request, res: Response) {

        const { name, price, description, userId }: TSchemaProductCreate = req.body

        SchemaProductCreate.parseAsync({
            userId: userId,
            name: name,
            price: price,
            description: description
        }).then(async (success) => {

            return await super.createProduct(req, res, success)

        }).catch((error) => {
            res.status(400).json(error)
        })

    }

    protected async findAll(req: Request, res: Response) {

        const { id } = req.params

        SchemaProductId.parseAsync({
            id: id
        }).then(async (success) => {

            return await super.findAllProduct(req, res, success)

        }).catch((error) => {
            res.status(400).json(error)
        })


    }

    protected async find(req: Request, res: Response) {

        const { id, userId } = req.params

        SchemaUserDeleteFind.parseAsync({
            id: id,
            userId: userId
        }).then(async (success) => {

            return await super.findUniqueProduct(req, res, success)

        }).catch((error) => {
            res.status(400).json(error)
        })

    }

    protected async update(req: Request, res: Response) {


        const { id, userId } = req.params
        const { description, name, price}: TSchemaProductUpdate = req.body

        SchemaProductUpdate.parseAsync({
            id: id,
            userId: userId,
            description: description,
            name: name,
            price: Number(price)
        }).then(async (success) => {

            return await super.updateProduct(req, res, success)

        }).catch((error) => {
            res.status(400).json(error)
        })


    }

    protected async remove(req: Request, res: Response) {

        const { id, userId } = req.params

        SchemaUserDeleteFind.parseAsync({
            id: id,
            userId: userId
        }).then(async (success) => {

            return await super.removeProduct(req, res, success)

        }).catch((error) => {
            res.status(400).json(error)
        })

    }

}

export default ProductController