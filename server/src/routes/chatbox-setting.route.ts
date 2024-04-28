import { ENDPOINTS } from '@/constants'
import { ChatboxSettingController } from '@/controllers/chatbox-setting.controller'
import { ChatboxSettingDto } from '@/dtos/chatbox-setting.dto'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { validate } from '@/middlewares/validation.middleware'
import type { Routes } from '@interfaces/routes.interface'
import { Router } from 'express'

export class ChatBoxSettingRoute implements Routes {
  public router: Router = Router()
  public controller = new ChatboxSettingController()

  constructor() {
    this.initializeRoutes()
  }
  initializeRoutes() {
    this.router.get(
      `${ENDPOINTS.CUSTOM_CHATBOX.INDEX}/:channelId`,
      this.controller.getChatboxSetting,
    )

    this.router.put(
      `${ENDPOINTS.CUSTOM_CHATBOX.INDEX}/:channelId`,
      validate(ChatboxSettingDto),
      authMiddleware,
      this.controller.updateChatboxSetting,
    )
  }
}
