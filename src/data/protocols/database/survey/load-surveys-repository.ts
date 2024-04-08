import { type SurveyModel } from '../../../../domain/models/survey'

export interface LoadSurveysRepository {
  load: () => Promise<SurveyModel[]>
}
