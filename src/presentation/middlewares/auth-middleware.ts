import { type LoadAccountByTokenRepository } from '../../data/protocols/database/account/load-account-by-token-repository'
import { AccessDeniedError } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { type HttpRequest, type HttpResponse, type Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = httpRequest.header?.['x-access-token']
      if (!token) return forbidden(new AccessDeniedError())
      const account = await this.loadAccountByTokenRepository.loadByToken(token)
      if (!account) return forbidden(new AccessDeniedError())
      return ok({ accountId: account.id })
    } catch (error) {
      return serverError(error)
    }
  }
}
