import { AddSurveyController } from '../../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { type Controller } from '../../../../../presentation/protocols'
import { makeDbAddSurvey } from '../../../usecases/survey/addsurvey/db-add-survey'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

export const makeAddSurveyController = (): Controller => {
  return new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
}
