import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols'
import { ok, serverError } from '../../presentation/helpers/http/http-helper'
import { LogControllerDecorator } from './log'
import { type LogErrorRepository } from '../../data/protocols/database/log-error-repository'

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {}
  }
  return new LogErrorRepositoryStub()
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await new Promise(resolve => { resolve(ok('any_account')) })
    }
  }
  return new ControllerStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'Lucas',
    email: 'email@mail.com',
    password: 'password',
    passwordConfirmation: 'password'
  }
})

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_error'
  return serverError(fakeError)
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('Log Controller Decorator', () => {
  test('Should call controller handle with correct values', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return same result of controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok('any_account'))
  })

  test('Should call LogErrorRepository with correct error if LogControllerDecorator receives server error from controller ', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => { resolve(makeFakeServerError()) }))
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    await sut.handle(makeFakeRequest())
    expect(logSpy).toHaveBeenCalledWith('any_error')
  })
})
