import { MongoHelper as sut } from './mongodb-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect()
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongo client is down', async () => {
    let accountsCollection = sut.getCollection('accounts')
    await sut.disconnect()
    accountsCollection = sut.getCollection('accounts')
    expect(accountsCollection).toBeTruthy()
  })
})
