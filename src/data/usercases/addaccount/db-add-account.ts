import { type AddAccountRepository } from '../../protocols/database/account/add-account-repository'
import { type LoadAccountByEmailRepository } from '../authentication/db-authentication-protocols'
import { type AddAccount, type AddAccountModel, type AccountModel, type Hasher } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly accountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel | null> {
    await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.accountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))

    return account
  }
}
