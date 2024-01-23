import { type AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { type AccountModel } from '../../../../domain/models/account'
import { type AddAccountModel } from '../../../../domain/usercases/add-account'
import { MongoHelper } from '../helper/mongodb-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    let accountData: AccountModel | any

    const accountCollection = MongoHelper.getCollection('accounts')

    await accountCollection.insertOne(account)

    const accountResult = await accountCollection.findOne({})

    if (accountResult) {
      const { _id, ...accountNoId } = accountResult
      accountData = Object.assign({}, accountNoId, { id: _id })
    }

    return await new Promise(resolve => { resolve(accountData) })
  }
}
