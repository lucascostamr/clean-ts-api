import { AuthMiddleware } from './auth-middleware'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'
import { type LoadAccountByTokenRepository, type AccountModel, type HttpRequest } from './auth-middleware-protocols'

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<AccountModel | null> {
      return await new Promise(resolve => { resolve(makeFakeAccount()) })
    }
  }
  return new LoadAccountByTokenRepositoryStub()
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

interface SutTypes {
  sut: AuthMiddleware
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository()
  const sut = new AuthMiddleware(loadAccountByTokenRepositoryStub, role)
  return {
    sut,
    loadAccountByTokenRepositoryStub
  }
}

describe('Authentication Middleware', () => {
  test('Should return 403 if no x-access-token is provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenRepositoryStub } = makeSut(role)
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.handle(makeFakeHeader())
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', role)
  })

  test('Should return 403 if LoadAccountByTokenRepository fails', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockResolvedValueOnce(null)
    const response = await sut.handle(makeFakeHeader())
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 500 if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockRejectedValueOnce(new Error())
    const response = await sut.handle(makeFakeHeader())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 200 on LoadAccountByTokenRepository returns an accountId', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeHeader())
    expect(response).toEqual(ok({ accountId: 'valid_id' }))
  })
})
