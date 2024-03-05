import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validations'
import { type Validation } from '../../../../validation/protocols'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

jest.mock('../../../../validation/validations/validation-composite')

describe('SignUp Validation', () => {
  test('Should call Validation Composite with correct validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
