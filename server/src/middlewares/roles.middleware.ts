import type { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { HttpException } from '@/exceptions/http-exception'
import type { RequestWithUser } from '@interfaces/auth.interface'
import type { InferResultType } from '@/database/types'

export const roles =
  (...roles: InferResultType<'users'>['roles']) =>
  (req: RequestWithUser, _res: Response, next: NextFunction) => {
    if (!req.user) {
      next(
        new HttpException(StatusCodes.FORBIDDEN, 'Bạn không có quyền truy cập'),
      )
    }

    const isMatched = roles.some((role) => req.user?.roles.includes(role))

    if (!isMatched) {
      next(
        new HttpException(StatusCodes.FORBIDDEN, 'Bạn không có quyền truy cập'),
      )
    }

    next()
  }
