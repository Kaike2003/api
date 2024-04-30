import express, { Request, Response } from "express"
import morgan from "morgan"
import cors from "cors"
import UserRoutes from "../routes/User/User.routes"
import ProductRoutes from "../routes/Product/Product.routes"
import { rateLimit } from 'express-rate-limit'

class Server {

    private app: express.Application

    constructor() {
        this.app = express()
        this.middleware()
        this.routes()
    }

    private middleware() {

        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
            standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
            // store: ... , // Redis, Memcached, etc. See below.
        })

        this.app
            .use(cors())
            .use(morgan("dev"))
            .use(express.json())
            .use(express.urlencoded())
            .use(limiter)

    }

    private routes() {

        this.app
            .use("/user", new UserRoutes().userRouter)
            .use("/product", new ProductRoutes().productRoutes)
            .get("/", (req: Request, res: Response) => {
                res.status(200).json("OK")
            })
            
    }

    public listen(value: number) {

        this.app.listen(value, () => {
            console.log(`Servidor rodando na porta = ${value}`)
        })

    }


}

export default Server