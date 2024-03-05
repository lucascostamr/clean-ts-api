import { type Collection } from 'mongodb'
import { MongoHelper } from '../helper/mongodb-helper'
import { type AddSurveyModel } from '../../../../domain/models/add-survey'
import { SurveyMongoRepository } from './survey-mongo-repository'

const makeFakeSurvey = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

describe('Survey Mongo Repository', () => {
  let surveyCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect((process.env.MONGO_URI ?? ''))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  test('Should add survey on success', async () => {
    const sut = makeSut()
    await sut.add(makeFakeSurvey())
    const response = await surveyCollection.findOne({ question: 'any_question' })
    expect(response).toBeTruthy()
  })
})
