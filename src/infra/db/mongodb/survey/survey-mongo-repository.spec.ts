import { MongoHelper, type AddSurveyModel } from './survey-mongo-repository-protocols'
import { SurveyMongoRepository } from './survey-mongo-repository'
import mockDate from 'mockdate'
import { type Collection } from 'mongodb'

const makeFakeSurvey = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

describe('Survey Mongo Repository', () => {
  let surveyCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect((process.env.MONGO_URI ?? ''))
    mockDate.set(new Date())
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
    mockDate.reset()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('add', () => {
    test('Should add survey on success', async () => {
      const sut = makeSut()
      await sut.add(makeFakeSurvey())
      const response = await surveyCollection.findOne({ question: 'any_question' })
      expect(response).toBeTruthy()
    })
  })

  describe('load', () => {
    test('Should load all surveys on success', async () => {
      const sut = makeSut()
      await surveyCollection.insertOne(makeFakeSurvey())
      const response = await sut.load()
      const { question, answers, date } = makeFakeSurvey()
      expect(response).toBeTruthy()
      expect(response[0]?.question).toBe(question)
      expect(response[0]?.answers).toEqual(answers)
      expect(response[0]?.date).toEqual(date)
    })

    test('Should return an empty array if load fails', async () => {
      const sut = makeSut()
      const response = await sut.load()
      expect(response).toEqual([])
    })
  })
})
