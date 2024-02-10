import { type Collection } from 'mongodb'

import { MongoHelper } from '../helper/mongodb-helper'
import { LogMongoRepository } from './log'

describe('Log Error Repository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('Should create an error on success', async () => {
    const sut = new LogMongoRepository()
    await sut.logError('any_error')
    const cont = await errorCollection.countDocuments()
    expect(cont).toBe(1)
  })
})
