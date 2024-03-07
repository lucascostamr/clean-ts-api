import { type LoadAccountByToken, type HttpRequest, type HttpResponse, type Middleware } from './auth-middleware-protocols'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = httpRequest.header?.['x-access-token']
      if (!token) return forbidden(new AccessDeniedError())
      const account = await this.loadAccountByToken.load(token, this?.role)
      if (!account) return forbidden(new AccessDeniedError())
      return ok({ accountId: account.id })
    } catch (error) {
      return serverError(error)
    }
  }
}
