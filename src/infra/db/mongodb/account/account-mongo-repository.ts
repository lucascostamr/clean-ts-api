import { type AddAccountRepository, type LoadAccountByEmailRepository, type LoadAccountByTokenRepository, type UpdateAccessTokenRepository, type AccountModel, type AddAccountModel, MongoHelper } from './account-mongo-repository-protocols'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
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

  async loadByToken (accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const accountResult = await accountCollection.findOne({ accessToken, $or: [{ role }, { role: 'admin' }] })
    if (!accountResult) return null
    return MongoHelper.map(accountResult)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const objectId = MongoHelper.makeObjectId(id)
    await accountCollection.updateOne({ _id: objectId }, { $set: { accessToken: token } })
  }
}
