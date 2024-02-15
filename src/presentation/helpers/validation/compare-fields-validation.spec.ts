import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

describe('Compare Fields Validation', () => {
  test('Should return InvalidParamError if validation fails', () => {
    const sut = new CompareFieldsValidation('password', 'passwordConfirmation')
    const input = {
      password: 'any_password',
      passwordConfirmation: 'invalid_password'
    }
    const response = sut.validate(input)
    expect(response).toEqual(new InvalidParamError('passwordConfirmation'))
  })
})
