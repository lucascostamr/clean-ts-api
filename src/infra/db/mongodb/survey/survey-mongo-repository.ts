import { type SurveyModel, type AddSurveyModel, type AddSurveyRepository, type LoadSurveysRepository, MongoHelper } from './survey-mongo-repository-protocols'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (survey: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(survey)
  }

  async load (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().map(survey => MongoHelper.map(survey)).toArray()
    return surveys
  }
}
