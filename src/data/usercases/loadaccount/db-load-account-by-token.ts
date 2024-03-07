import { type AccountModel } from '../../../domain/models/account'
import { type LoadAccountByToken } from '../../../domain/usercases/load-account-by-token'
import { type Decrypter } from '../../protocols/criptograph/decrypter'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter
  ) {}

  async load (acessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    const token = await this.decrypter.decrypt(acessToken)
    if (!token) return null
    return {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
  }
}
