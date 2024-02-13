import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param-error'
import { type EmailValidator } from '../signup/signup-protocols'
import { InvalidParamError } from '../../errors'
import { type Authentication } from '../../../domain/usercases/authentication'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return await new Promise(resolve => { resolve(badRequest(new MissingParamError('email'))) })
      }
      if (!password) {
        return await new Promise(resolve => { resolve(badRequest(new MissingParamError('password'))) })
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) return await new Promise(resolve => { resolve(badRequest(new InvalidParamError('email'))) })
      await this.authentication.auth(email, password)
      return await new Promise(resolve => { resolve(ok('')) })
    } catch (error) {
      return serverError(new Error())
    }
  };
}
