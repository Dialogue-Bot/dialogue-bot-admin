import { ENDPOINTS } from '@/constants'
import { SubscriptionController } from '@/controllers/subscription.controller'
import {
  CreateBillingPortalSessionDto,
  CreateSubscriptionDto,
} from '@/dtos/subscription.dto'
import { Routes } from '@/interfaces/routes.interface'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { validate } from '@/middlewares/validation.middleware'
import { Router } from 'express'

export class SubscriptionRoute implements Routes {
  router = Router()
  controller = new SubscriptionController()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.post(
      ENDPOINTS.SUBSCRIPTIONS.CREATE_CHECKOUT_SESSION,
      validate(CreateSubscriptionDto),
      authMiddleware,
      this.controller.subscribe,
    )

    this.router.post(
      ENDPOINTS.SUBSCRIPTIONS.CREATE_BILLING_PORTAL_SESSION,
      validate(CreateBillingPortalSessionDto),
      authMiddleware,
      this.controller.createBillingPortalSession,
    )
  }
}
