import { type SurveyModel, type LoadSurveys, type LoadSurveysRepository } from './db-load-surveys-protocols'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (): Promise<SurveyModel[]> {
    return await this.loadSurveysRepository.load()
  }
}
