import { MongoHelper } from '../helper/mongodb-helper'
import { AccountMongoRepository } from './account'

describe('Account MongoDb Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
    const sut = new AccountMongoRepository()

    const accountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }

    const account = await sut.add(accountData)

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
})
