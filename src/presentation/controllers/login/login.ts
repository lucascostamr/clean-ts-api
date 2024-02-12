import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'
import { badRequest, ok } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param-error'
import { type EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body

    if (!email) {
      return await new Promise(resolve => { resolve(badRequest(new MissingParamError('email'))) })
    }
    if (!password) {
      return await new Promise(resolve => { resolve(badRequest(new MissingParamError('password'))) })
    }
    this.emailValidator.isValid(email)
    return await new Promise(resolve => { resolve(ok('')) })
  };
}
