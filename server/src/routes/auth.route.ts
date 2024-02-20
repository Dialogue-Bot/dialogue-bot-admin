import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import type { Routes } from '@interfaces/routes.interface';
import {
   ForgotPasswordDto,
   LoginDto,
   RegisterDto,
   ResetPasswordDto,
} from '@/dtos/auth.dto';
import { validate } from '@/middlewares/validation.middleware';
import { auth } from 'firebase-admin';
import { ENDPOINTS } from '@/constants';

export class AuthRoute implements Routes {
   public router: Router = Router();
   public controller = new AuthController();

   constructor() {
      this.initializeRoutes();
   }

   initializeRoutes() {
      this.router.post(
         ENDPOINTS.AUTH.LOGIN,
         validate(LoginDto, 'body'),
         this.controller.login
      );

      this.router.post(
         ENDPOINTS.AUTH.LOGIN_ADMIN,
         validate(LoginDto),
         this.controller.loginAdmin
      );

      this.router.post(
         ENDPOINTS.AUTH.REGISTER,
         validate(RegisterDto),
         this.controller.register
      );

      this.router.post(
         ENDPOINTS.AUTH.REFRESH_TOKEN,
         this.controller.refreshToken
      );

      this.router.post(
         ENDPOINTS.AUTH.FORGOT_PASSWORD,
         validate(ForgotPasswordDto),
         this.controller.forgotPassword
      );

      this.router.post(
         ENDPOINTS.AUTH.RESET_PASSWORD,
         validate(ResetPasswordDto),
         this.controller.resetPassword
      );

      this.router.get(
         ENDPOINTS.AUTH.CURRENT_USER,

         auth,
         this.controller.getCurrentUser
      );
   }
}
