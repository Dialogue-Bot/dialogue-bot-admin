import { ENDPOINTS } from '@/constants'
import { BotMailController } from '@/controllers/bot-mail.controller'
import { BotMailDto } from '@/dtos/bot-mail.dto'
import { Routes } from '@/interfaces/routes.interface'
import { validate } from '@/middlewares/validation.middleware'
import { Router } from 'express'

export class BotMailRoute implements Routes {
  router = Router()
  controller = new BotMailController()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.post(
      ENDPOINTS.BOT_MAIL.SEND_MAIL,
      validate(BotMailDto),
      this.controller.sendMail,
    )
  }
}
