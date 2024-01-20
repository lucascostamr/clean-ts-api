import { type AddAccountRepository } from '../../protocols/add-account-repository'
import { type AddAccount, type AddAccountModel, type AccountModel, type Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly accountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, accountRespository: AddAccountRepository) {
    this.encrypter = encrypter
    this.accountRepository = accountRespository
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)

    await this.accountRepository.add(Object.assign({}, account, { password: hashedPassword }))

    return await new Promise(resolve => {
      resolve({
        id: 'string',
        name: 'string',
        email: 'string',
        password: 'string'
      })
    })
  }
}
