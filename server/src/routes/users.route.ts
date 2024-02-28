import { ENDPOINTS } from '@/constants';
import { ChangePasswordDto, UpdateInfoUserDto } from '@/dtos/users.dto';
import { auth } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validation.middleware';
import { UserController } from '@controllers/users.controller';
import type { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class UserRoute implements Routes {
   public router: Router = Router();
   public controller = new UserController();

   constructor() {
      this.initializeRoutes();
   }

   initializeRoutes() {
      this.router.patch(ENDPOINTS.USER.UPDATE_INFO,
         validate(UpdateInfoUserDto),
         auth,
         this.controller.updateInfo
      )

      this.router.post(ENDPOINTS.USER.CHANGE_PASSWORD,

         validate(ChangePasswordDto),
         auth,
         this.controller.changePassword)
   }
}
