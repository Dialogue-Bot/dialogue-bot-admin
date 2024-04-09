import { ENDPOINTS } from '@/constants'
import { FlowController } from '@/controllers/flows.controller'
import { FlowDTO, TestYourBotDTO } from '@/dtos/flows.dto'
import { PagingDTO } from '@/dtos/paging.dto'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { validate } from '@/middlewares/validation.middleware'
import type { Routes } from '@interfaces/routes.interface'
import { Router } from 'express'

export class FlowRoute implements Routes {
  public router: Router = Router()
  public controller = new FlowController()

  constructor() {
    this.initializeRoutes()
  }
  initializeRoutes() {
    this.router.post(
      ENDPOINTS.FLOW.INDEX,
      validate(FlowDTO, 'body'),
      authMiddleware,
      this.controller.createFlow,
    )

    this.router.put(
      `${ENDPOINTS.FLOW.INDEX}/:id`,
      validate(FlowDTO, 'body'),
      authMiddleware,
      this.controller.updateFlow,
    )

    this.router.post(
      `${ENDPOINTS.FLOW.PUBLISH}/:id`,
      authMiddleware,
      this.controller.publishFlow,
    )

    this.router.delete(
      `${ENDPOINTS.FLOW.INDEX}/:id`,
      authMiddleware,
      this.controller.deleteFlow,
    )

    this.router.get(
      `${ENDPOINTS.FLOW.INDEX}/for-select`,
      authMiddleware,
      this.controller.selectFlowsForChannel,
    )

    //for bot get flow by contactId
    this.router.get(
      `${ENDPOINTS.FLOW.INDEX}/:contactId`,
      validate(TestYourBotDTO, 'body'),
      this.controller.getFlowByContactId,
    )

    this.router.get(
      `${ENDPOINTS.FLOW.GET_ONE}/:id`,
      authMiddleware,
      this.controller.getFlowById,
    )

    this.router.get(
      `${ENDPOINTS.FLOW.INDEX}`,
      validate(PagingDTO, 'query'),
      authMiddleware,
      this.controller.getAllFlows,
    )
  }
}
