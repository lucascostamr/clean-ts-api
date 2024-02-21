import { type AddAccountRepository } from '../../../../data/protocols/database/account/add-account-repository'
import { type LoadAccountByEmailRepository } from '../../../../data/protocols/database/account/load-account-by-email-repository'
import { type UpdateAccessTokenRepository } from '../../../../data/protocols/database/account/update-access-token-repository'
import { type AccountModel } from '../../../../domain/models/account'
import { type AddAccountModel } from '../../../../domain/usercases/add-account'
import { MongoHelper } from '../helper/mongodb-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(account)
    const accountResult = await accountCollection.findOne({ _id: result.insertedId })
    return MongoHelper.map(accountResult)
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const accountResult = await accountCollection.findOne({ email })
    if (!accountResult) return null
    return MongoHelper.map(accountResult)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const objectId = MongoHelper.makeObjectId(id)
    await accountCollection.updateOne({ _id: objectId }, { $set: { accessToken: token } })
  }
}
