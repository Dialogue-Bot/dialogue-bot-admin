import { ENDPOINTS } from '@/constants'
import { ChannelController } from '@/controllers/channels.controller'
import {
  ChannelDTO,
  DeleteChannelDTO,
  UpdateChannelForTestDto,
} from '@/dtos/channels.dto'
import { PagingDTO } from '@/dtos/paging.dto'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { validate } from '@/middlewares/validation.middleware'
import type { Routes } from '@interfaces/routes.interface'
import { Router } from 'express'

export class ChannelRoute implements Routes {
  public router: Router = Router()
  public controller = new ChannelController()

  constructor() {
    this.initializeRoutes()
  }
  initializeRoutes() {
    this.router.post(
      ENDPOINTS.CHANNEL.INDEX,
      validate(ChannelDTO, 'body'),
      authMiddleware,
      this.controller.createChannel,
    )

    this.router.put(
      ENDPOINTS.CHANNEL.FOR_TEST,
      validate(UpdateChannelForTestDto),
      authMiddleware,
      this.controller.updateChannelForTest,
    )

    this.router.put(
      `${ENDPOINTS.CHANNEL.INDEX}/:id`,
      validate(ChannelDTO, 'body'),
      authMiddleware,
      this.controller.updateChannel,
    )

    this.router.delete(
      `${ENDPOINTS.CHANNEL.DELETE}/:id`,
      authMiddleware,
      this.controller.deleteChannel,
    )

    this.router.delete(
      ENDPOINTS.CHANNEL.DELETES,
      validate(DeleteChannelDTO, 'body'),
      authMiddleware,
      this.controller.deleteMultipleChannel,
    )

    this.router.get(
      ENDPOINTS.CHANNEL.FOR_TEST,
      authMiddleware,
      this.controller.getChannelForTest,
    )

    this.router.get(
      ENDPOINTS.CHANNEL.INDEX,
      validate(PagingDTO, 'query'),
      authMiddleware,
      this.controller.getAllChannels,
    )

    this.router.get(ENDPOINTS.CHANNEL.TYPES, this.controller.getChannelTypes)

    this.router.get(
      `${ENDPOINTS.CHANNEL.TYPES}/:id`,
      this.controller.getChannelType,
    )

    this.router.get(
      `${ENDPOINTS.CHANNEL.INDEX}/for-select`,
      authMiddleware,
      this.controller.getChannelsForSelect,
    )
  }
}
