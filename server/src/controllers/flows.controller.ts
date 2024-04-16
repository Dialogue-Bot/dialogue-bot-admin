import { LOCALE_KEY } from '@/constants'
import { PagingDTO } from '@/dtos/paging.dto'
import { LocaleService } from '@/i18n/ctx'
import { RequestWithUser } from '@/interfaces/auth.interface'
import { FlowService } from '@/services/flows.service'
import { catchAsync } from '@/utils/catch-async'
import { plainToClass } from 'class-transformer'
import { StatusCodes } from 'http-status-codes'
import Container from 'typedi'

export class FlowController {
  public flowService = Container.get(FlowService)
  public localeService = Container.get<LocaleService>(LOCALE_KEY)

  public createFlow = catchAsync(async (req: RequestWithUser, res) => {
    req.body.userId = req.user?.id
    const data = await this.flowService.create(req.body)
    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().FLOW.CREATE_SUCCESS(),
      data,
    })
  })

  public updateFlow = catchAsync(async (req: RequestWithUser, res) => {
    req.body.userId = req.user?.id
    const data = await this.flowService.updateFlowById({
      fields: req.body,
      id: req.params.id,
      userId: req.user.id,
    })
    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().FLOW.UPDATE_SUCCESS(),
      data,
    })
  })

  public deleteFlow = catchAsync(async (req: RequestWithUser, res) => {
    await this.flowService.deleteById(req.params.id, req.user?.id as string)
    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().FLOW.DELETE_FLOW_SUCCESS(),
    })
  })

  public publishFlow = catchAsync(async (req: RequestWithUser, res) => {
    await this.flowService.publishFlow(req.params.id, req.user?.id as string)
    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().FLOW.PUBLISH_FLOW_SUCCESS(),
    })
  })

  public getFlowById = catchAsync(async (req: RequestWithUser, res) => {
    const data = await this.flowService.getFlowById(
      req.params.id,
      req.user?.id as string,
    )
    res.status(StatusCodes.OK).json({ data })
  })

  public getAllFlows = catchAsync(async (req: RequestWithUser, res) => {
    const paging = plainToClass(PagingDTO, req.query)

    const data = await this.flowService.getAllFlows(
      paging,
      req.user?.id as string,
    )
    res.status(StatusCodes.OK).json({ data })
  })

  public selectFlowsForChannel = catchAsync(
    async (req: RequestWithUser, res) => {
      const data = await this.flowService.getFlowsForSelect(
        req.user?.id as string,
      )
      res.status(StatusCodes.OK).json({ data })
    },
  )

  public getFlowByContactId = catchAsync(async (req: RequestWithUser, res) => {
    const data = await this.flowService.getFlowByContactId(req.params.contactId, req.body.isTest)
    res.status(StatusCodes.OK).send(data);
  })

  public getFlowByIdForBot = catchAsync(async (req: RequestWithUser, res) => {
    const data = await this.flowService.getFlowByIdForBot(req.params.id, req.body.isTest)
    res.status(StatusCodes.OK).send(data);
  })
}
