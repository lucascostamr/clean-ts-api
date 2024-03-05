import { type AddSurveyModel } from '../models/add-survey'

export interface AddSurvey {
  add: (survey: AddSurveyModel) => Promise<void>
}
