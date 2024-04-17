import { LOCALE_KEY } from '@/constants'
import { BotMailDto } from '@/dtos/bot-mail.dto'
import { LocaleService } from '@/i18n/ctx'
import { BotMailService } from '@/services/bot-mail.service'
import { catchAsync } from '@/utils/catch-async'
import { StatusCodes } from 'http-status-codes'
import Container from 'typedi'

export class BotMailController {
  private readonly botMailService = Container.get(BotMailService)
  private readonly localeService: LocaleService = Container.get(LOCALE_KEY)

  sendMail = catchAsync(async (req, res) => {
    await this.botMailService.sendMail(req.body as BotMailDto)

    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().COMMON.SEND_MAIL_SUCCESS(),
    })
  })
}
