import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helper/mongodb-helper'
import { type Collection } from 'mongodb'

describe('Add Survey Routes', () => {
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect((process.env.MONGO_URI ?? ''))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('surveys')
    await accountCollection.deleteMany({})
  })

  test('Should return 403 on addSurvey with no accessToken', async () => {
    await request(app)
      .post('/api/surveys')
      .send({
        question: 'any_question',
        answers: [
          {
            image: 'any_image_url',
            answer: 'any_answer'
          }
        ]
      })
      .expect(403)
  })
})
