import { Router } from "express"
import ProductController from "../../controllers/Produtc.controller"

class ProductRoutes extends ProductController {

    public productRoutes = Router()

    constructor() {
        super()
        this.routes()
    }

    private async routes() {
        this.productRoutes.post("", super.create)
        this.productRoutes.get("/:id", super.findAll)
        this.productRoutes.get("/:id/:userId", super.find)
        this.productRoutes.patch("/:id/:userId", super.update)
        this.productRoutes.delete("/:id/:userId", super.remove)
    }

}


export default ProductRoutes