import { ENDPOINTS } from '@/constants'
import { IntentController } from '@/controllers/intent.controller'
import { IntentDTO, PredictIntentDTO } from '@/dtos/intent.dto'
import { PagingDTO } from '@/dtos/paging.dto'
import { Routes } from '@/interfaces/routes.interface'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { validate } from '@/middlewares/validation.middleware'
import { Router } from 'express'

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

    this.router.post(
      ENDPOINTS.INTENT.PREDICT,
      validate(PredictIntentDTO, 'body'),
      this.controller.predictIntent,
    )

    this.router.put(
      `${ENDPOINTS.INTENT.INDEX}/:id`,
      validate(IntentDTO, 'body'),
      authMiddleware,
      this.controller.updateIntent,
    )

    this.router.delete(
      `${ENDPOINTS.INTENT.INDEX}/:id`,
      authMiddleware,
      this.controller.deleteIntent,
    )

    this.router.get(
      ENDPOINTS.INTENT.FOR_SELECT,
      authMiddleware,
      this.controller.getForSelect,
    )

    this.router.get(
      `${ENDPOINTS.INTENT.INDEX}/:id`,
      authMiddleware,
      this.controller.getById,
    )

    this.router.get(
      ENDPOINTS.INTENT.INDEX,
      validate(PagingDTO, 'query'),
      authMiddleware,
      this.controller.getAllIntents,
    )

    this.router.post(
      ENDPOINTS.INTENT.TEST,
      validate(PredictIntentDTO, 'body'),
      authMiddleware,
      this.controller.testPredict,
    )
  }
}
