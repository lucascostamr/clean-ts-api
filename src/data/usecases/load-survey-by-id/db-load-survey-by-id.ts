import { type SurveyModel } from '../../../domain/models/survey'
import { type LoadSurveyById } from '../../../domain/usecases/load-survey-by-id'
import { type LoadSurveyByIdRepository } from '../../protocols/database/survey/load-survey-by-id-repository'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}

  async loadById (surveyId: string): Promise<SurveyModel | null> {
    await this.loadSurveyByIdRepository.loadById(surveyId)
    return null
  }
}
