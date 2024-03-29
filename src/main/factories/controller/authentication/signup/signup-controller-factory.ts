import { SignUpController } from '../../../../../presentation/controllers/authentication/signup/signUp-controller'
import { type Controller } from '../../../../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAddAccount } from '../../../usecases/account/addaccount/db-add-account-factory'
import { makeLogControllerDecorator } from '../../../decorator/log-controller-decorator-factory'
import { makeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
