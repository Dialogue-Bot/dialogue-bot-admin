import { ENDPOINTS } from '@/constants'
import { PlanController } from '@/controllers/plan.controller'
import { Routes } from '@/interfaces/routes.interface'
import { Router } from 'express'

export class PlanRoute implements Routes {
  router = Router()
  controller = new PlanController()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.get(ENDPOINTS.PLANS.INDEX, this.controller.getAllPlans)
  }
}
