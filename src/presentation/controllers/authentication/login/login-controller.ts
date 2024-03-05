import { type Controller, type HttpRequest, type HttpResponse, type Authentication, type Validation } from './login-controller-protocols'
import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helper'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body)
      if (validationError) return badRequest(validationError)
      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth({
        email,
        password
      })
      if (!accessToken) return unauthorized()
      return ok({ accessToken })
    } catch (error) {
      return serverError(new Error())
    }
  };
}
