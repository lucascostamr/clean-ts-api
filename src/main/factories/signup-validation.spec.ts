import { CompareFieldsValidation } from '../../presentation/helpers/validation/compare-fields-validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validation/required-field-validation'
import { type Validation } from '../../presentation/helpers/validation/validation'
import { ValidationComposite } from '../../presentation/helpers/validation/validation-composite'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validation/validation-composite')

describe('SignUp Validation', () => {
  test('Should call Validation Composite with correct validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'name', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
