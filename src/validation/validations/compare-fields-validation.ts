import { type Validation } from '../protocols/validation'
import { InvalidParamError } from '../../presentation/errors/'

export class CompareFieldsValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (input: any): Error | null {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) return new InvalidParamError(this.fieldToCompareName)
    return null
  }
}
