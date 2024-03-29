import { type Middleware } from '../../../presentation/protocols'
import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import { makeLoadAccountByToken } from '../usecases/account/load-account-by-token/load-account-by-token-factory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeLoadAccountByToken(), role)
}
