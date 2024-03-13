import { LOCALE_KEY } from '@/constants'
import { LocaleService } from '@/i18n/ctx'
import { WebhookService } from '@/services/webhook.service'
import { catchAsync } from '@/utils/catch-async'
import { StatusCodes } from 'http-status-codes'
import Container from 'typedi'

export class WebhookController {
  public webhookService = Container.get(WebhookService)
  public localeService = Container.get<LocaleService>(LOCALE_KEY)

  public verifyWebhook = catchAsync(async (req, res) => {
    const data = await this.webhookService.verifyWebhook(
      req.params.contactId as string,
      req,
      res,
    )

    res.status(StatusCodes.OK).send(data)
  })

  public handleIncomingMessage = catchAsync(async (req, res) => {
    await this.webhookService.handleIncomingMessage(
      req.params.contactId,
      req,
      res,
    )
    res.status(StatusCodes.OK).end()
  })
}
