import { type AddSurveyModel, type AddSurveyRepository } from '../../../../data/usecases/addsurvey/db-add-survey-protocols'
import { MongoHelper } from '../helper/mongodb-helper'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (survey: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(survey)
  }
}
