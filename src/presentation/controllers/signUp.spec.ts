import { SignUpController } from './signUp'
import { MissingParamError, InvalidParamError, ServerError } from '../errors'
import { type EmailValidator } from '../protocols'

interface SutTypes {
  sut: SignUpController
  emailValidatorStup: EmailValidator
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStup implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStup()
}

const makeSut = (): SutTypes => {
  const emailValidatorStup = makeEmailValidator()
  const sut = new SignUpController(emailValidatorStup)

  return {
    sut,
    emailValidatorStup
  }
}

describe('SignUp Controller', () => {
  test('Shoud return 400 if no name is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_passwordConfirmation'
      }
    }

    const response = sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('name'))
  })

  test('Shoud return 400 if no email is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_passwordConfirmation'
      }
    }

    const response = sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('email'))
  })

  test('Shoud return 400 if no password is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_passwordConfirmation'
      }
    }

    const response = sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('password'))
  })

  test('Shoud return 400 if no password confirmation is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_passwordConfirmation'
      }
    }

    const response = sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Shoud return 400 if an invalid email is provided', () => {
    const { sut, emailValidatorStup } = makeSut()

    jest.spyOn(emailValidatorStup, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_passwordConfirmation'
      }
    }

    const response = sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new InvalidParamError('email'))
  })

  test('Shoud call EmailValidator with correct email', () => {
    const { sut, emailValidatorStup } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStup, 'isValid')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_passwordConfirmation'
      }
    }

    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  test('Shoud return 500 if EmailValidator throws an error', () => {
    const { sut, emailValidatorStup } = makeSut()

    jest.spyOn(emailValidatorStup, 'isValid').mockImplementationOnce(() => { throw new Error() })

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_passwordConfirmation'
      }
    }
    const response = sut.handle(httpRequest)

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new ServerError())
  })
})
