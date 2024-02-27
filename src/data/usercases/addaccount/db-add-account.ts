import { type AddAccountRepository } from '../../protocols/database/account/add-account-repository'
import { type AddAccount, type AddAccountModel, type AccountModel, type Hasher } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly accountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel | null> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.accountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))

    return account
  }
}
