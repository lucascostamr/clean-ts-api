import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-surveys/load-surveys-controller'
import { type Controller } from '../../../../../presentation/protocols'
import { makeDbLoadSurveys } from '../../../usecases/survey/load-surveys/db-load-surveys'

export const makeLoadSurveysController = (): Controller => {
  return new LoadSurveysController(makeDbLoadSurveys())
}
