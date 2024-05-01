import { ENDPOINTS } from '@/constants'
import { StripeWebhookController } from '@/controllers/stripe-webhook.controller'
import { Routes } from '@/interfaces/routes.interface'
import express, { Router } from 'express'

export class StripeWebhookRoute implements Routes {
  router = Router()
  controller = new StripeWebhookController()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.post(
      ENDPOINTS.STRIPE_WEBHOOK.INDEX,
      express.raw({ type: 'application/json' }),
      this.controller.handleStripeWebhook,
    )
  }
}
