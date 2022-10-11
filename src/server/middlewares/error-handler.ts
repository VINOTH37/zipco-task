import { Context } from 'koa'
import { IMiddleware } from 'koa-router'
import { Logger } from 'pino'
import { AppError } from '../../errors'

const httpCodes = {
  500: 500,
  404: 404,
  409: 409,
  400: 400,
  401: 401,
  403: 403
}

export function errorHandler(logger: Logger): IMiddleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next()
    } catch (err) {
      logger.error('Error Handler:', err)

      if (err instanceof AppError) {
        ctx.body = err.toModel()
        ctx.status = httpCodes[err.code] ? httpCodes[err.code] : 500
      } else {
        ctx.body = new AppError(500, 'Internal Error Server')
        ctx.status = 500
      }
    }
  }
}
