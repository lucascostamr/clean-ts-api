import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validations'
import { type Validation, type EmailValidator } from '../../../../../validation/protocols'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('../../../../../validation/validations/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    };
  }
  return new EmailValidatorStub()
}

describe('SignUp Validation', () => {
  test('Should call Validation Composite with correct validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
