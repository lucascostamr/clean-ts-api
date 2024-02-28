import { MissingParamError } from '../../presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('Required Fields Validation', () => {
  test('Should return MissingParam error if validation fails', () => {
    const sut = new RequiredFieldValidation('email')
    const response = sut.validate({})
    expect(response).toEqual(new MissingParamError('email'))
  })

  test('Should return null on success', () => {
    const sut = new RequiredFieldValidation('email')
    const response = sut.validate({ email: 'any_email' })
    expect(response).toBe(null)
  })
})
