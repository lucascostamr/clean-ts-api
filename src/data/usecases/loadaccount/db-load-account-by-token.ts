import { type AccountModel } from '../../../domain/models/account'
import { type LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { type Decrypter } from '../../protocols/criptograph/decrypter'
import { type LoadAccountByTokenRepository } from '../../protocols/database/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    const token = await this.decrypter.decrypt(accessToken)
    if (!token) return null
    const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    if (!account) return null
    return account
  }
}
