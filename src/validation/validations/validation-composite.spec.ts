import { MissingParamError } from '../../presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'
import { ValidationComposite } from './validation-composite'

describe('Validation Composite', () => {
  test('Should return MissingParam error if validation fails', () => {
    const sut = new ValidationComposite([new RequiredFieldValidation('email')])
    const response = sut.validate({})
    expect(response).toEqual(new MissingParamError('email'))
  })

  test('Should return null on success', () => {
    const sut = new ValidationComposite([new RequiredFieldValidation('email')])
    const response = sut.validate({ email: 'any_email' })
    expect(response).toBe(null)
  })
})
