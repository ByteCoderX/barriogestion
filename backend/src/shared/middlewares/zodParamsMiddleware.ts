import { AppException, httpStatusCodes } from '@shared/exceptions/AppException'
import type { Request, Response, NextFunction } from 'express'
import { type ZodObject } from 'zod'

export function zodParamsMiddleware(schema: ZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params)

    if (!result.success) {
      throw new AppException(
        'Datos Inválidos',
        httpStatusCodes.unproccesableEntity,
      )
    }
    next()
  }
}
