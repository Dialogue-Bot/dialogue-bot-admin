import { LOCALE_KEY } from '@/constants'
import { PagingDTO } from '@/dtos/paging.dto'
import { LocaleService } from '@/i18n/ctx'
import { RequestWithUser } from '@/interfaces/auth.interface'
import { ChannelService } from '@/services/channels.service'
import { catchAsync } from '@/utils/catch-async'
import { plainToClass } from 'class-transformer'
import { StatusCodes } from 'http-status-codes'
import Container from 'typedi'

export class ChannelController {
  public channelService = Container.get(ChannelService)
  public localeService = Container.get<LocaleService>(LOCALE_KEY)

  public createChannel = catchAsync(async (req: RequestWithUser, res) => {
    req.body.userId = req.user?.id
    await this.channelService.create(req.body)
    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().CHANNEL.CREATE_SUCCESS(),
    })
  })

  public updateChannel = catchAsync(async (req: RequestWithUser, res) => {
    req.body.userId = req.user?.id
    await this.channelService.updateById(req.params.id, req.body)
    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().CHANNEL.UPDATE_SUCCESS(),
    })
  })

  public deleteChannel = catchAsync(async (req: RequestWithUser, res) => {
    await this.channelService.deleteById(req.params.id, req.user?.id as string)
    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().CHANNEL.DELETE_CHANNEL_SUCCESS(),
    })
  })

  public deleteMultipleChannel = catchAsync(
    async (req: RequestWithUser, res) => {
      await this.channelService.deleteByIds(
        req.body.ids,
        req.user?.id as string,
      )
      res.status(StatusCodes.OK).json({
        message: this.localeService
          .i18n()
          .CHANNEL.DELETE_MULTIPLE_CHANNELS_SUCCESS(),
      })
    },
  )

  public getAllChannels = catchAsync(async (req: RequestWithUser, res) => {
    const paging = plainToClass(PagingDTO, req.query)

    const data = await this.channelService.getAllChannels(
      paging,
      req.user?.id as string,
    )
    res.status(StatusCodes.OK).json({ data })
  })

  public getChannelTypes = catchAsync(async (_req, res) => {
    const data = await this.channelService.getTypes()
    res.status(StatusCodes.OK).json({ data })
  })

  public getChannelType = catchAsync(async (req, res) => {
    const data = await this.channelService.getTypeById(req.params.id)
    res.status(StatusCodes.OK).json({ data })
  })

  public getChannelsForSelect = catchAsync(
    async (req: RequestWithUser, res) => {
      const data = await this.channelService.getChannelsForSelect(
        req.user?.id,
        {
          ...(req.query as any),
        },
      )
      res.status(StatusCodes.OK).json({ data })
    },
  )

  public getChannelForTest = catchAsync(async (req: RequestWithUser, res) => {
    const data = await this.channelService.getChannelForTest(
      req.user.id,
      req.params?.flowId,
    )
    res.status(StatusCodes.OK).json({ data })
  })

  public getChannelForTemplateTest = catchAsync(
    async (req: RequestWithUser, res) => {
      const data = await this.channelService.getChannelForTestInTemplate(
        req.params?.flowId,
      )
      res.status(StatusCodes.OK).json({ data })
    },
  )

  public updateChannelForTest = catchAsync(
    async (req: RequestWithUser, res) => {
      await this.channelService.updateChannelForTest(req.user.id, req.body)
      res.status(StatusCodes.OK).json({
        message: this.localeService.i18n().CHANNEL.UPDATE_SUCCESS(),
      })
    },
  )
}
