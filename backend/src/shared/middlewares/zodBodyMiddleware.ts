import { InvalidRequestDataException } from '@shared/exceptions/InvalidRequestDataException'
import { FieldErrors } from '@shared/types/FieldError'
import type { Request, Response, NextFunction } from 'express'
import { type ZodObject } from 'zod'

export function zodBodyMiddleware(schema: ZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      throw new InvalidRequestDataException(
        result.error.issues.reduce((result, issue) => {
          const field = issue.path[0] as string

          if (!result[field]) {
            result[field] = []
          }

          result[field].push(issue.message)

          return result
        }, {} as FieldErrors),
      )
    }
    next()
  }
}
