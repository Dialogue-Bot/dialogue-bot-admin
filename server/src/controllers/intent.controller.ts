import { LOCALE_KEY } from '@/constants'
import { PagingDTO } from '@/dtos/paging.dto'
import { LocaleService } from '@/i18n/ctx'
import { RequestWithUser } from '@/interfaces/auth.interface'
import { IntentService } from '@/services/intent.service'
import { catchAsync } from '@/utils/catch-async'
import { plainToClass } from 'class-transformer'
import { StatusCodes } from 'http-status-codes'
import Container from 'typedi'

export class IntentController {
  public intentService = Container.get(IntentService)
  public localeService = Container.get<LocaleService>(LOCALE_KEY)

  public createIntent = catchAsync(async (req: RequestWithUser, res) => {
    const data = await this.intentService.create({
      fields: req.body,
      userId: req.user?.id as string,
    })
    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().INTENT.CREATE_SUCCESS(),
      data,
    })
  })

  // for bot
  public predictIntent = catchAsync(async (req: RequestWithUser, res) => {
    req.body.userId = req.user?.id
    const data = await this.intentService.PredictTrainIntent(req.body)
    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().INTENT.PREDICT_SUCCESS(),
      data,
    })
  })

  public getById = catchAsync(async (req, res) => {
    const data = await this.intentService.getById(req.params.id)
    res.status(StatusCodes.OK).json({ data })
  })

  public updateIntent = catchAsync(async (req: RequestWithUser, res) => {
    const data = await this.intentService.updateById({
      id: req.params.id,
      fields: req.body,
      userId: req.user?.id as string,
    })

    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().INTENT.UPDATE_SUCCESS(),
      data,
    })
  })

  public getAllIntents = catchAsync(async (req: RequestWithUser, res) => {
    const paging = plainToClass(PagingDTO, req.query)
    const data = await this.intentService.getAllIntents(
      paging,
      req.user?.id as string,
    )
    res.status(StatusCodes.OK).json({ data })
  })

  public deleteIntent = catchAsync(async (req, res) => {
    const data = await this.intentService.deleteById(req.params.id)
    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().INTENT.DELETE_SUCCESS(),
      data,
    })
  })

  public getForSelect = catchAsync(async (req: RequestWithUser, res) => {
    const data = await this.intentService.getIntentsForSelect(
      req.user?.id as string,
    )
    res.status(StatusCodes.OK).json({ data })
  })
}
