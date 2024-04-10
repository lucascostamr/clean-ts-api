import { type SurveyModel } from '../../../domain/models/survey'
import { type LoadSurveyById } from '../../../domain/usecases/load-survey-by-id'
import { type LoadSurveyByIdRepository } from '../../protocols/database/survey/load-survey-by-id-repository'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}

  async loadById (surveyId: string): Promise<SurveyModel> {
    await this.loadSurveyByIdRepository.loadById(surveyId)
    return {
      id: 'any_id',
      question: 'any_question',
      answers: [{ image: 'any_image', answer: 'any_answer' }],
      date: new Date()
    }
  }
}
