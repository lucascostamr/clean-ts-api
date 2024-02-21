import { type Controller, type HttpRequest } from '../../../presentation/protocols'
import { type Request, type Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      res.status(httpResponse.statusCode).json(httpResponse.body.message)
      return
    }
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
