import { type LoadSurveys } from '../../../../domain/usecases/load-surveys'
import { type Controller, type HttpRequest, type HttpResponse } from '../../../protocols'
import { noContent, ok, serverError } from '../../../helpers/http/http-helper'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      if (!surveys.length) return noContent()
      return ok(surveys)
    } catch (error) {
      return serverError(error)
    }
  }
}
