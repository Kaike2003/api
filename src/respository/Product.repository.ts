import { Request, Response } from "express";
import ProductCreateDto from "../dto/product/ProductCreateDto.dto";
import ProductIdDto from "../dto/product/ProductIdDto.dto";
import ProductUpdateDto from "../dto/product/ProductUpdateDto.dto.";
import { prisma } from "../prisma/prisma";
import ProductIdRemoveFindDto from "../dto/product/ProductIdRemoveFindDto.dto";


class ProductRepository {

    protected async createProduct(req: Request, res: Response, user: ProductCreateDto) {

        const { description, name, price, userId } = user

        const verifyUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (verifyUser?.id === userId) {

            const response = await prisma.product.create({
                select: {
                    id: false,
                    name: true,
                    price: true,
                    description: true,
                    create_at: true,
                    update_at: true
                },
                data: {
                    name: name,
                    price: price,
                    description: description,
                    userId: userId
                }
            }).then((success) => {
                return res.status(201).json(success)
            }).catch((error) => {
                return res.status(400).json(error)
            })

        } else {
            res.status(400).json(`${userId} invalido`)
        }

    }

    protected async findUniqueProduct(req: Request, res: Response, user: ProductIdRemoveFindDto) {


        const { id, userId } = user

        const verifyUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        const verifyProduct = await prisma.product.findUnique({
            where: {
                id: id
            }
        })

        if (verifyUser?.id === userId) {

            if (verifyProduct?.id === id && verifyProduct.userId === userId) {

                const response = await prisma.product.findUnique({
                    select: {
                        id: false,
                        name: true,
                        price: true,
                        description: true,
                        create_at: true,
                        update_at: true
                    },
                    where: {
                        id: verifyProduct.id
                    }
                }).then((success) => {
                    res.status(200).json(success)
                }).catch((error) => {
                    res.status(400).json(error)
                })


            } else {
                res.status(400).json(`${userId} invalido`)
            }

        } else {
            res.status(400).json(`${userId} invalido`)
        }

    }

    protected async findAllProduct(req: Request, res: Response, user: ProductIdDto) {

        const { id } = user

        const verifyUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (verifyUser?.id === id) {

            const response = await prisma.product.findMany({
                select: {
                    id: false,
                    name: true,
                    price: true,
                    description: true,
                    create_at: true,
                    update_at: true
                },
                where: {
                    User: {
                        id: id
                    }
                }
            }).then((success) => {
                res.status(200).json(success)
            }).catch((error) => {
                res.status(400).json(error)
            })


        } else {
            res.status(400).json(`${id} invalido`)
        }


    }

    protected async updateProduct(req: Request, res: Response, user: ProductUpdateDto) {

        const { id, userId,description, name, price } = user

        const verifyUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        const verifyProduct = await prisma.product.findUnique({
            where: {
                id: id
            }
        })

        if (verifyUser?.id === userId) {

            if (verifyProduct?.id === id && verifyProduct.userId === userId) {

                const response = await prisma.product.update({
                    select: {
                        id: false,
                        name: true,
                        price: true,
                        description: true,
                        create_at: true,
                        update_at: true
                    },
                    where: {
                        id: verifyProduct.id
                    },
                    data: {
                        description: description,
                        name: name,
                        price: price
                    }
                }).then((success) => {
                    res.status(200).json(success)
                }).catch((error) => {
                    res.status(400).json(error)
                })


            } else {
                res.status(400).json(`${userId} invalido`)
            }

        } else {
            res.status(400).json(`${userId} invalido`)
        }

    }

    protected async removeProduct(req: Request, res: Response, user: ProductIdRemoveFindDto) {


        const { id, userId } = user

        const verifyUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        const verifyProduct = await prisma.product.findUnique({
            where: {
                id: id
            }
        })

        if (verifyUser?.id === userId) {

            if (verifyProduct?.id === id && verifyProduct.userId === userId) {

                const response = await prisma.product.delete({
                    select: {
                        id: false,
                        name: true,
                        price: true,
                        description: true,
                        create_at: true,
                        update_at: true
                    },
                    where: {
                        id: verifyProduct.id
                    }
                }).then((success) => {
                    res.status(200).json(success)
                }).catch((error) => {
                    res.status(400).json(error)
                })


            } else {
                res.status(400).json(`${userId} invalido`)
            }

        } else {
            res.status(400).json(`${userId} invalido`)
        }

    }

}

export default ProductRepository