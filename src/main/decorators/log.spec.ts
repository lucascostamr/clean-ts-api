import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('Log Controller Decorator', () => {
  test('Should call controller handle with correct values', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        return await new Promise(resolve => {
          resolve({
            statusCode: 200,
            body: {
              name: 'Lucas'
            }
          })
        })
      }
    }

    const controllerStub = new ControllerStub()
    const sut = new LogControllerDecorator(controllerStub)

    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = {
      body: {
        name: 'Lucas',
        email: 'email@mail.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }

    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledWith({
      body: {
        name: 'Lucas',
        email: 'email@mail.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    })
  })
})
