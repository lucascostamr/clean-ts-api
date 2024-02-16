import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../presentation/helpers/validation'
import { type Validation } from '../../../presentation/protocols/validation'
import { type EmailValidator } from '../../../presentation/protocols/email-validator'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../../presentation/helpers/validation/validation-composite')

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
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'name', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
