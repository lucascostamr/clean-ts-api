import { type Validation } from '../../../../../validation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validations'

export const makeAddSurveyValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
