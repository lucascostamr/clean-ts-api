import { type LoadSurveys } from '../../../../domain/usecases/load-surveys'
import { type Controller, type HttpRequest, type HttpResponse } from '../../../protocols'
import { ok } from '../../../helpers/http/http-helper'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveys.load()
    return ok('')
  }
}
