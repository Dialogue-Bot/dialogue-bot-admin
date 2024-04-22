import { ENDPOINTS } from '@/constants'
import { UserSubscriptionController } from '@/controllers/user-subscription.controller'
import { Routes } from '@/interfaces/routes.interface'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { Router } from 'express'

export class UserSubscriptionRoute implements Routes {
  router = Router()
  controller = new UserSubscriptionController()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.get(
      ENDPOINTS.USER_SUBSCRIPTIONS.CURRENT,
      authMiddleware,
      this.controller.getCurrentUserSubscription,
    )

    this.router.get(
      ENDPOINTS.USER_SUBSCRIPTIONS.USAGE,
      authMiddleware,
      this.controller.getUsage,
    )
  }
}
