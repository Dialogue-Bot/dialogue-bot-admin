import { ENDPOINTS } from '@/constants'
import { SettingController } from '@/controllers/setting.controller'
import { UpdateEmailSettingDto } from '@/dtos/setting.dto'
import { Routes } from '@/interfaces/routes.interface'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { decryptMiddleware } from '@/middlewares/decrypt.middleware'
import { validate } from '@/middlewares/validation.middleware'
import { Router } from 'express'

export class SettingRoute implements Routes {
  router = Router()
  controller = new SettingController()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.get(
      ENDPOINTS.SETTING.INDEX,
      authMiddleware,
      this.controller.getSetting,
    )

    this.router.put(
      ENDPOINTS.SETTING.MAIL,
      decryptMiddleware,
      validate(UpdateEmailSettingDto),
      authMiddleware,
      this.controller.updateEmailSetting,
    )

    this.router.get(
      ENDPOINTS.SETTING.BY_CONTACT_ID,
      this.controller.getByContactId,
    )

    this.router.get(
      ENDPOINTS.SETTING.TEST_SEND_MAIL,
      authMiddleware,
      this.controller.testSendMail,
    )
  }
}
