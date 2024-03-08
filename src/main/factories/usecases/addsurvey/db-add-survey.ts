import { DbAddSurvey } from '../../../../data/usecases/addsurvey/db-add-survey'
import { SurveyMongoRepository } from '../../../../infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbAddSurvey = (): DbAddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
