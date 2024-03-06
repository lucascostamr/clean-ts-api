import { AuthMiddleware } from './auth-middleware'
import { forbidden } from '../helpers/http/http-helper'
const makeSut = (): AuthMiddleware => {
  return new AuthMiddleware()
}

describe('Authentication Middleware', () => {
  test('Should return 403 if no x-access-token is provided', async () => {
    const sut = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(forbidden())
  })
})
