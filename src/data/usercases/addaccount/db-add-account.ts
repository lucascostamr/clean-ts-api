import { type AddAccountRepository } from '../../protocols/database/add-account-repository'
import { type AddAccount, type AddAccountModel, type AccountModel, type Hasher } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher
  private readonly accountRepository: AddAccountRepository

  constructor (hasher: Hasher, accountRespository: AddAccountRepository) {
    this.hasher = hasher
    this.accountRepository = accountRespository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.accountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))

    return account
  }
}
