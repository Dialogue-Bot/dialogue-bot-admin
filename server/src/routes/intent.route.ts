import { ENDPOINTS } from "@/constants"
import { IntentController } from "@/controllers/intent.controller"
import { IntentDTO } from "@/dtos/intent.dto"
import { Routes } from "@/interfaces/routes.interface"
import { authMiddleware } from "@/middlewares/auth.middleware"
import { validate } from "@/middlewares/validation.middleware"
import { Router } from "express"

export class IntentRoute implements Routes {
    public router: Router = Router()
    public controller = new IntentController()

    constructor() {
        this.initializeRoutes()
    }
    initializeRoutes() {
        this.router.post(
            ENDPOINTS.INTENT.INDEX,
            validate(IntentDTO, 'body'),
            authMiddleware,
            this.controller.createIntent,
        )
    }
}