import { MissingParamError } from '../../errors/missing-param-error'

export class SignUpController {
  handle (httpRequest: any): any {
    return {
      statusCode: 400,
      body: new MissingParamError('name')
    }
  }
}
