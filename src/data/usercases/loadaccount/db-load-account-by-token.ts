import { type AccountModel } from '../../../domain/models/account'
import { type LoadAccountByToken } from '../../../domain/usercases/load-account-by-token'
import { type Decrypter } from '../../protocols/criptograph/decrypter'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter
  ) {}

  async load (acessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    await this.decrypter.decrypt(acessToken)
    return null
  }
}
