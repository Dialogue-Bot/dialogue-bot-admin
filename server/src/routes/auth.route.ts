import { ENDPOINTS } from '@/constants'
import {
  ForgotPasswordDto,
  IdTokenDto,
  LoginDto,
  RegisterDto,
  RequestVerifyAccountDto,
  ResetPasswordDto,
} from '@/dtos/auth.dto'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { validate } from '@/middlewares/validation.middleware'
import { AuthController } from '@controllers/auth.controller'
import type { Routes } from '@interfaces/routes.interface'
import { Router } from 'express'

export class AuthRoute implements Routes {
  public router: Router = Router()
  public controller = new AuthController()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.post(
      ENDPOINTS.AUTH.LOGIN,
      validate(LoginDto, 'body'),
      this.controller.login,
    )

    this.router.post(
      ENDPOINTS.AUTH.LOGIN_ADMIN,
      validate(LoginDto),
      this.controller.loginAdmin,
    )

    this.router.post(
      ENDPOINTS.AUTH.REGISTER,
      validate(RegisterDto),
      this.controller.register,
    )

    this.router.post(ENDPOINTS.AUTH.REFRESH_TOKEN, this.controller.refreshToken)

    this.router.post(
      ENDPOINTS.AUTH.FORGOT_PASSWORD,
      validate(ForgotPasswordDto),
      this.controller.forgotPassword,
    )

    this.router.post(
      ENDPOINTS.AUTH.RESET_PASSWORD,
      validate(ResetPasswordDto),
      this.controller.resetPassword,
    )

    this.router.post(
      ENDPOINTS.AUTH.WITH_ID_TOKEN,
      validate(IdTokenDto),
      this.controller.loginWithIdToken,
    )

    this.router.post(
      ENDPOINTS.AUTH.VERIFY_ACCOUNT,
      this.controller.verifyAccount,
    )

    this.router.post(
      ENDPOINTS.AUTH.REQUEST_VERIFY_ACCOUNT,
      validate(RequestVerifyAccountDto),
      this.controller.requestVerifyAccount,
    )

    this.router.get(
      ENDPOINTS.AUTH.CURRENT_USER,
      authMiddleware,
      this.controller.getCurrentUser,
    )

    this.router.post(
      ENDPOINTS.AUTH.LOGOUT,
      authMiddleware,
      this.controller.logout,
    )
  }
}
