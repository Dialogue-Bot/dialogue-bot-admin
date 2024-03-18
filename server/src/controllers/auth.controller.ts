import { LOCALE_KEY } from '@/constants'
import { LocaleService } from '@/i18n/ctx'
import type { RequestWithUser, TTokenData } from '@/interfaces/auth.interface'
import { catchAsync } from '@/utils/catch-async'
import { AuthService } from '@services/auth.service'
import type { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Container } from 'typedi'

export class AuthController {
  public authService = Container.get(AuthService)
  public localeService = Container.get<LocaleService>(LOCALE_KEY)

  public login = catchAsync(async (req, res) => {
    const { accessToken, refreshToken } = await this.authService.login(req.body)

    this.setTokensCookie(res, { accessToken, refreshToken })

    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().AUTH.LOGIN_SUCCESS(),
      data: { accessToken, refreshToken },
    })
  })

  public loginWithIdToken = catchAsync(async (req, res) => {
    const { accessToken, refreshToken } =
      await this.authService.loginWithIdToken(req.body)

    this.setTokensCookie(res, { accessToken, refreshToken })

    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().AUTH.LOGIN_SUCCESS(),
      data: { accessToken, refreshToken },
    })
  })

  public loginAdmin = catchAsync(async (req, res) => {
    const data = await this.authService.loginAdmin(req.body)

    this.setTokensCookie(res, data)

    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().AUTH.LOGIN_SUCCESS(),
      data,
    })
  })

  public register = catchAsync(async (req, res) => {
    const data = await this.authService.register(req.body)

    res.status(StatusCodes.CREATED).json({
      message: this.localeService.i18n().AUTH.REGISTER_SUCCESS(),
      data,
    })
  })

  public forgotPassword = catchAsync(async (req, res) => {
    const clientUrl = req.header('Referer')
    await this.authService.forgotPassword(req.body, clientUrl)

    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().AUTH.FORGOT_PASSWORD_SUCCESS(),
      data: null,
    })
  })

  public resetPassword = catchAsync(async (req, res) => {
    await this.authService.resetPassword(req.body)

    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().AUTH.SET_PASSWORD_SUCCESS(),
      data: null,
    })
  })

  public refreshToken = catchAsync(async (req, res) => {
    const data = await this.authService.refreshToken(req.cookies.refresh_token)

    this.setTokensCookie(res, data)

    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().AUTH.REFRESH_TOKEN_SUCCESS(),
      data,
    })
  })

  public getCurrentUser = catchAsync(async (req: RequestWithUser, res) => {
    const data = await this.authService.findCurrentUser(req.user?.id as string)

    console.log('data', data)

    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().USER.GET_USER_SUCCESS(),
      data,
    })
  })

  public logout = catchAsync(async (req: RequestWithUser, res) => {
    await this.authService.logout(req.user?.id as string)

    this.clearTokensCookie(res)

    res.status(StatusCodes.OK).json({
      message: this.localeService.i18n().AUTH.LOGOUT_SUCCESS(),
      data: null,
    })
  })

  private setTokensCookie = (res: Response, tokens: TTokenData) => {
    const { accessToken, refreshToken } = tokens
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'lax',
      domain: 'localhost', // TODO: THIS WILL BE CHANGED IN PRODUCTION
    })

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: 'lax',
      domain: 'localhost', //TODO: THIS WILL BE CHANGED IN PRODUCTION
    })
  }

  private clearTokensCookie = (res: Response) => {
    res.clearCookie('access_token')
    res.clearCookie('refresh_token')
  }
}
