import { AuthMiddleware } from './auth-middleware'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'
import { type LoadAccountByToken, type AccountModel, type HttpRequest } from './auth-middleware-protocols'

const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (token: string, role?: string): Promise<AccountModel | null> {
      return await new Promise(resolve => { resolve(makeFakeAccount()) })
    }
  }
  return new LoadAccountByTokenStub()
}

const makeFakeHeader = (): HttpRequest => ({
  header: {
    'x-access-token': 'any_token'
  }
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByToken: LoadAccountByToken
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByToken = makeLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByToken, role)
  return {
    sut,
    loadAccountByToken
  }
}

describe('Authentication Middleware', () => {
  test('Should return 403 if no x-access-token is provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct values', async () => {
    const role = 'any_role'
    const { sut, loadAccountByToken } = makeSut(role)
    const loadByTokenSpy = jest.spyOn(loadAccountByToken, 'load')
    await sut.handle(makeFakeHeader())
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', role)
  })

  test('Should return 403 if LoadAccountByToken fails', async () => {
    const { sut, loadAccountByToken } = makeSut()
    jest.spyOn(loadAccountByToken, 'load').mockResolvedValueOnce(null)
    const response = await sut.handle(makeFakeHeader())
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByToken } = makeSut()
    jest.spyOn(loadAccountByToken, 'load').mockRejectedValueOnce(new Error())
    const response = await sut.handle(makeFakeHeader())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 200 on LoadAccountByToken returns an accountId', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeHeader())
    expect(response).toEqual(ok({ accountId: 'valid_id' }))
  })
})
