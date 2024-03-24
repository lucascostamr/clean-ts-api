import { type Middleware, type HttpRequest } from '../../../presentation/protocols'
import { type NextFunction, type Request, type Response } from 'express'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      header: req.headers
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode !== 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body.message)
      return
    }
    Object.assign(req, httpResponse.body)
    next()
  }
}
