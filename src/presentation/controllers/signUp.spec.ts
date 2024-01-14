import { SignUpController } from './signUp'

describe('SignUp Controller', () => {
  test('Shoud return 400 if no name is provided', () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_passwordConfirmation'
      }
    }

    const response = sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
  })
})
