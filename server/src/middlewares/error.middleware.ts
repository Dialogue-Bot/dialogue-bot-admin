import type { NextFunction, Request, Response } from 'express';
import type { HttpException } from '@/exceptions/http-exception';
import { logger } from '@utils/logger';

export const ErrorMiddleware = (
   error: HttpException,
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const status: number = error.status || 500;
      const message: string = error.message || 'Something went wrong';

      logger.error(
         `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message} >> Details:: ${error.stack}`
      );

      res.status(status).json({ message });
   } catch (err) {
      logger.error(err);
      next(err);
   }
};
