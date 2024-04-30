import { Response } from "express";
import { prisma } from "../prisma/prisma";
import UserCreateDto from "../dto/user/UserCreateDto.dto";
import UserUpdateDto from "../dto/user/UserUpdateDto.dto.";
import UserIdDto from "../dto/user/UserIdDto.dto";

class UserRepository {

    protected async createUser(res: Response, user: UserCreateDto) {

        const { birthday, email, firstname, lastname, phone } = user

        const responseEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (responseEmail?.email === email) {
            res.status(400).json(`Ja existe uma conta criada com esse email: ${user.email}`)
        } else {

            await prisma.user.create({
                select: {
                    id: false,
                    email: true,
                    birthday: true,
                    firstname: true,
                    lastname: true,
                    phone: true,

                },
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    phone: phone,
                    birthday: birthday
                }
            }).then((success) => {
                res.status(201).json(success)
            }).catch((error) => {
                res.status(400).json(error)
            })

        }




    }

    protected async finUniqueUser(res: Response, user: UserIdDto) {

        const { id } = user

        const verifyUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (verifyUser?.id === id) {

            await prisma.user.findUnique({
                select: {
                    id: false,
                    firstname: true,
                    lastname: true,
                    birthday: true,
                    email: true,
                    phone: true,
                    productid: true
                },
                where: {
                    id: id
                }
            }).then((success) => {
                return res.status(200).json(success)
            }).catch((error) => {
                return res.status(400).json(error)
            })


        } else {
            res.status(400).json(`${user.id} invalido`)
        }


    }

    protected async findAllUser(res: Response) {

        const response = await prisma.user.findMany({
            select: {
                id: false,
                firstname: true,
                lastname: true,
                birthday: true,
                email: true,
                phone: true,
                productid: true
            }
        })

        res.status(200).json(response)

    }

    protected async removeUser(res: Response, user: UserIdDto) {

        const { id } = user

        const verifyUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (verifyUser?.id === id) {

            await prisma.user.delete({
                where: {
                    id: id
                }
            }).then((success) => {
                return res.status(200).json(success)
            }).catch((error) => {
                return res.status(400).json(error)
            })


        } else {
            res.status(400).json(`${user.id} invalido`)
        }


    }

    protected async updateUser(res: Response, user: UserUpdateDto) {

        const { birthday, email, firstname, id, lastname, phone } = user

        const verifyUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })


        if (verifyUser?.email === email) {
            res.status(400).json(`Ja existe uma conta criada com esse email: ${email}`)
        } else {

            if (verifyUser?.id === id) {

                await prisma.user.update({
                    select: {
                        firstname: true,
                        lastname: true,
                        email: true,
                        birthday: true,
                        phone: true,
                        create_at: true,
                        update_at: true
                    },
                    where: {
                        id: user.id
                    },
                    data: {
                        firstname: firstname,
                        email: email,
                        phone: phone,
                        lastname: lastname,
                        birthday: birthday
                    }
                }).then((success) => {
                    return res.status(200).json(success)
                }).catch((error) => {
                    return res.status(400).json(error)
                })

            } else {
                res.status(400).json(`${id} invalido`)
            }

        }



    }

}

export default UserRepository
