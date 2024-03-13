import { decrypt } from '@/utils/crypto'
import { NextFunction, Request, Response } from 'express'

export const decryptMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (req.body?.encrypted) {
    req.body = JSON.parse(decrypt(req.body.encrypted))
  }

  next()
}
