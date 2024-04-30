import { Router } from "express"
import UserController from "../../controllers/User.controller"


class UserRoutes extends UserController {

    public userRouter = Router()

    constructor() {
        super()
        this.routes()
    }

    private async routes() {
        this.userRouter.post("", super.create)
        this.userRouter.get("/:id", super.findUnique)
        this.userRouter.get("", super.findAll)
        this.userRouter.delete("/:id", super.remove)
        this.userRouter.patch("/:id", super.update)
    }


}


export default UserRoutes