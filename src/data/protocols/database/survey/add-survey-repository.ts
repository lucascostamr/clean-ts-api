import { type AddSurveyModel } from '../../../../domain/models/survey'

export interface AddSurveyRepository {
  add: (survey: AddSurveyModel) => Promise<void>
}
