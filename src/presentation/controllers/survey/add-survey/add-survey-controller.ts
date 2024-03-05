import { type Controller, type HttpRequest, type HttpResponse } from '../../../protocols'
import { ok } from '../../../helpers/http/http-helper'
import { type Validation } from '../../../../validation/protocols'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return await new Promise(resolve => { resolve(ok('')) })
  }
}
