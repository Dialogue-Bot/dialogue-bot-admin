import { ENDPOINTS } from '@/constants'
import { ConversationLiveChatController } from '@/controllers/conversation-live-chat.controller'
import {
  ConversationLiveChatCreateDto,
  ConversationLiveChatQueryDto,
} from '@/dtos/conversation-live-chat.dto'
import { Routes } from '@/interfaces/routes.interface'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { validate } from '@/middlewares/validation.middleware'
import { Router } from 'express'

export class ConversationLiveChatRoute implements Routes {
  router = Router()
  controller = new ConversationLiveChatController()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.post(
      ENDPOINTS.CONVERSATION_LIVE_CHAT.INDEX,
      validate(ConversationLiveChatCreateDto),
      this.controller.createConversation,
    )
    this.router.get(
      ENDPOINTS.CONVERSATION_LIVE_CHAT.INDEX,
      authMiddleware,
      validate(ConversationLiveChatQueryDto, 'query'),
      this.controller.getConversations,
    )

    this.router.get(
      ENDPOINTS.CONVERSATION_LIVE_CHAT.GET_MESSAGES,
      this.controller.getMessages,
    )
  }
}
