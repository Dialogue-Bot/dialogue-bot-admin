import type { Request, Response, NextFunction } from 'express';

export const catchAsync = <U>(
   fn: (req: Request, res: Response, next: NextFunction) => Promise<U>
) => {
   return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
   };
};
