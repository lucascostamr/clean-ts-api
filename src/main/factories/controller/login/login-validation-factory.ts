import { type Validation } from '../../../../presentation/protocols/validation'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../../presentation/helpers/validation'
import { EmailValidatorAdapter } from '../../../adapters/validators/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}