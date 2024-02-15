import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('Required Fields Validation', () => {
  test('Should return MissingParam error if validation fails', () => {
    const sut = new RequiredFieldValidation('email')
    const response = sut.validate({})
    expect(response).toEqual(new MissingParamError('email'))
  })
})
