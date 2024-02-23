import { Container } from 'typedi';
import { StatusCodes } from 'http-status-codes';
import type { Response } from 'express';
import { AuthService } from '@services/auth.service';
import { catchAsync } from '@/utils/catch-async';
import type { RequestWithUser, TTokenData } from '@/interfaces/auth.interface';
import { LOCALE_KEY } from '@/constants';
import L from '@/i18n/i18n-node';
import { LocaleService } from '@/i18n/ctx';

export class AuthController {
   public authService = Container.get(AuthService);
   public localeService = Container.get<LocaleService>(LOCALE_KEY);

   public login = catchAsync(async (req, res) => {
      const { accessToken, refreshToken } = await this.authService.login(
         req.body
      );

      this.setTokensCookie(res, { accessToken, refreshToken });

      res.status(StatusCodes.OK).json({
         message: this.localeService.i18n().AUTH.LOGIN_SUCCESS(),
         data: { accessToken, refreshToken },
      });
   });

   public loginAdmin = catchAsync(async (req, res) => {
      const data = await this.authService.loginAdmin(req.body);

      this.setTokensCookie(res, data);

      res.status(StatusCodes.OK).json({
         message: this.localeService.i18n().AUTH.LOGIN_SUCCESS(),
         data,
      });
   });

   public register = catchAsync(async (req, res) => {
      const data = await this.authService.register(req.body);

      res.status(StatusCodes.CREATED).json({
         message: this.localeService.i18n().AUTH.REGISTER_SUCCESS(),
         data,
      });
   });

   public forgotPassword = catchAsync(async (req, res) => {
      const clientUrl = req.header('Referer');
      await this.authService.forgotPassword(req.body, clientUrl);

      res.status(StatusCodes.OK).json({
         message: this.localeService.i18n().AUTH.FORGOT_PASSWORD_SUCCESS(),
         data: null,
      });
   });

   public resetPassword = catchAsync(async (req, res) => {
      await this.authService.resetPassword(req.body);

      res.status(StatusCodes.OK).json({
         message: this.localeService.i18n().AUTH.SET_PASSWORD_SUCCESS(),
         data: null,
      });
   });

   public refreshToken = catchAsync(async (req, res) => {
      const data = await this.authService.refreshToken(
         req.cookies.refresh_token
      );

      this.setTokensCookie(res, data);

      res.status(StatusCodes.OK).json({
         message: this.localeService.i18n().AUTH.REFRESH_TOKEN_SUCCESS(),
         data,
      });
   });

   public getCurrentUser = catchAsync(async (req: RequestWithUser, res) => {
      const data = await this.authService.findCurrentUser(
         req.user?.id as string
      );

      res.status(StatusCodes.OK).json({
         message: this.localeService.i18n().USER.GET_USER_SUCCESS(),
         data,
      });
   });

   private setTokensCookie = (res: Response, tokens: TTokenData) => {
      const { accessToken, refreshToken } = tokens;
      res.cookie('access_token', accessToken, {
         httpOnly: true,
         maxAge: 1000 * 60 * 60 * 24,
         sameSite: 'lax',
         domain: 'localhost', // TODO: THIS WILL BE CHANGED IN PRODUCTION
      });

      res.cookie('refresh_token', refreshToken, {
         httpOnly: true,
         maxAge: 1000 * 60 * 60 * 24 * 30,
         sameSite: 'lax',
         domain: 'localhost', //TODO: THIS WILL BE CHANGED IN PRODUCTION
      });
   };
}
