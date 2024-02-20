import { type AddAccountRepository } from '../../../../data/protocols/database/add-account-repository'
import { type LoadAccountByEmailRepository } from '../../../../data/protocols/database/load-account-by-email-repository'
import { type AccountModel } from '../../../../domain/models/account'
import { type AddAccountModel } from '../../../../domain/usercases/add-account'
import { MongoHelper } from '../helper/mongodb-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(account)
    const accountResult = await accountCollection.findOne({ _id: result.insertedId })
    return MongoHelper.map(accountResult)
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const accountResult = await accountCollection.findOne({ email })
    return MongoHelper.map(accountResult)
  }
}
