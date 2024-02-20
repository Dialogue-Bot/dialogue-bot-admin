import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import type { Routes } from '@interfaces/routes.interface';

export class UserRoute implements Routes {
   public path = '/users';
   public router: Router = Router();
   public user = new UserController();

   constructor() {
      this.initializeRoutes();
   }

   private initializeRoutes() {
      // handle all routes here
   }
}
