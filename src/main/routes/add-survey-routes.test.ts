import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helper/mongodb-helper'
import { type Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

describe('Add Survey Routes', () => {
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect((process.env.MONGO_URI ?? ''))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
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

  test('Should return 204 on addSurvey success', async () => {
    const res = await accountCollection.insertOne({
      name: 'Lucas',
      email: 'lucascostamr812@gmail.com',
      password: '1234',
      role: 'admin'
    })
    const id = res.insertedId.toString()
    const accessToken = sign({ id }, env.jwtSecret)
    await accountCollection.updateOne({ _id: res.insertedId }, { $set: { accessToken } })
    await request(app)
      .post('/api/surveys')
      .set('x-access-token', accessToken)
      .send({
        question: 'any_question',
        answers: [
          {
            image: 'any_image_url',
            answer: 'any_answer'
          }
        ]
      })
      .expect(204)
  })
})
