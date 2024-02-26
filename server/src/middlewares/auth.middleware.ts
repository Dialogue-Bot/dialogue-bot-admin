import { HttpException } from '@/exceptions/http-exception';
import { AuthService } from '@/services/auth.service';
import { UserService } from '@/services/users.service';
import { ACCESS_TOKEN_SECRET } from '@config';
import type { RequestWithUser, TTokenStore } from '@interfaces/auth.interface';
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Container } from 'typedi';

const getAuthorization = (req: Request): string | null => {
   const coockie = req.cookies.access_token as unknown;

   if (coockie) return coockie as string;

   const header = req.header('Authorization');
   if (header) return header.split('Bearer ')[1];

   return null;
};

export const auth = async (
   req: RequestWithUser,
   res: Response,
   next: NextFunction
) => {
   try {
      const userService = Container.get(UserService);
      const authService = Container.get(AuthService);
      const Authorization = getAuthorization(req);



      if (Authorization) {
         const { id } = (await authService.verifyToken(
            Authorization,
            ACCESS_TOKEN_SECRET as string
         )) as TTokenStore;

         const user = await userService.findOneById(id);

         if (user) {
            req.user = user;
            next();
         } else {
            next(
               new HttpException(
                  StatusCodes.UNAUTHORIZED,
                  'Token đăng nhập hết hạn hoặc không hợp lệ'
               )
            );
         }
      } else {
         next(
            new HttpException(
               StatusCodes.BAD_REQUEST,
               'Token đăng nhập không tồn tại'
            )
         );
      }
   } catch (error) {
      next(
         new HttpException(
            StatusCodes.UNAUTHORIZED,
            'Token đăng nhập hết hạn hoặc không hợp lệ'
         )
      );
   }
};
