import { type AddSurveyModel } from '../../../../domain/models/add-survey'

export interface AddSurveyRepository {
  add: (survey: AddSurveyModel) => Promise<void>
}
