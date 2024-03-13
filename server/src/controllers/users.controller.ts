import { LOCALE_KEY } from '@/constants'
import { LocaleService } from '@/i18n/ctx'
import { RequestWithUser } from '@/interfaces/auth.interface'
import { catchAsync } from '@/utils/catch-async'
import { UserService } from '@services/users.service'
import { StatusCodes } from 'http-status-codes'
import { Container } from 'typedi'

export class UserController {
  private userService = Container.get(UserService)
  private localeService = Container.get<LocaleService>(LOCALE_KEY)

  public updateInfo = catchAsync(async (req: RequestWithUser, res) => {
    const data = await this.userService.updateInformation(req.user.id, req.body)

    res.status(StatusCodes.OK).json({
      data,
      message: this.localeService.i18n().USER.UPDATE_INFO_SUCCESS(),
    })
  })

  public changePassword = catchAsync(async (req: RequestWithUser, res) => {
    await this.userService.changePassword(req.user.id, req.body)

    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().USER.CHANGE_PASSWORD_SUCCESS(),
    })
  })
}
