import { plainToInstance } from 'class-transformer'
import type { ValidationError } from 'class-validator'
import { validateOrReject } from 'class-validator'
import type { NextFunction, Request, Response } from 'express'
import { HttpException } from '@/exceptions/http-exception'

/**
 * Allows use of decorator and non-decorator based validation
 * @param type - dto
 * @param skipMissingProperties - When skipping missing properties
 * @param whitelist - Even if your object is an instance of a validation class it can contain additional properties that are not defined
 * @param forbidNonWhitelisted - If you would rather to have an error thrown when any non-whitelisted properties are present
 */
export const validate = (
  income: any,
  type: 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(income, req[type])
    validateOrReject(dto, {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    })
      .then(() => {
        req[type] = dto
        next()
      })
      .catch((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors
            .map((error) => Object.values(error?.constraints as {}))
            .join(', ')
          next(new HttpException(400, message))
        }
      })
  }
}
