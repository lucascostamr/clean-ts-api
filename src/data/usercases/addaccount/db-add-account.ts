import { type AddAccountRepository } from '../../protocols/add-account-repository'
import { type AddAccount, type AddAccountModel, type AccountModel, type Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly accountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, accountRespository: AddAccountRepository) {
    this.encrypter = encrypter
    this.accountRepository = accountRespository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.accountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))

    return account
  }
  //  asdasd
}
