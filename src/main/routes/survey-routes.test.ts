import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helper/mongodb-helper'
import { type Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let accountCollection: Collection
let surveysCollection: Collection

const makeFakeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne(makeFakeAccount())
  const id = res.insertedId.toString()
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({ _id: res.insertedId }, { $set: { accessToken } })
  return accessToken
}

const makeFakeAccount = (): any => ({
  name: 'Lucas',
  email: 'lucascostamr812@gmail.com',
  password: '1234',
  role: 'admin'
})

const makeFakeSurvey = (): any => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image_url',
      answer: 'any_answer'
    }
  ]
})

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect((process.env.MONGO_URI ?? ''))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    surveysCollection = await MongoHelper.getCollection('surveys')
    await accountCollection.deleteMany({})
    await surveysCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on addSurvey with no accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send(makeFakeSurvey())
        .expect(403)
    })

    test('Should return 204 on addSurvey success', async () => {
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', await makeFakeAccessToken())
        .send(makeFakeSurvey())
        .expect(204)
    })
  })

  describe('GET /surveys', () => {
    test('Should return 403 on surveys with no accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })

    test('Should return 200 on load surveys with valid accessToken', async () => {
      await surveysCollection.insertOne(makeFakeSurvey())
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', await makeFakeAccessToken())
        .expect(200)
    })
  })
})
