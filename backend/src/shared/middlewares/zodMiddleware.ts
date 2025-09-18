import type { Request, Response, NextFunction } from 'express';
import { type ZodObject } from 'zod';

declare global {
  namespace Express {
    interface Request {
      validated?: object;
    }
  }
}

export function validate(schema: ZodObject, property: 'body' | 'query' | 'params' = 'body') {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[property]);

    const detailedErrors = result.error?._zod.def.map((err) => ({
      error: err.code,
      path: err.path.splice(0, 1).join('.'),
      message: err.message,
    }));


    if (!result.success) {
      return res.status(400).json({
        error: 'Datos Inválidos.',
        detailed: detailedErrors,
      });
    }

    req.validated = result.data;
    next();
  };
}