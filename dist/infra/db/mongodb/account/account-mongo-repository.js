"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountMongoRepository = void 0;
const mongodb_helper_1 = require("../helper/mongodb-helper");
class AccountMongoRepository {
    async add(account) {
        const accountCollection = await mongodb_helper_1.MongoHelper.getCollection('accounts');
        const result = await accountCollection.insertOne(account);
        const accountResult = await accountCollection.findOne({ _id: result.insertedId });
        return mongodb_helper_1.MongoHelper.map(accountResult);
    }
    async loadByEmail(email) {
        const accountCollection = await mongodb_helper_1.MongoHelper.getCollection('accounts');
        const accountResult = await accountCollection.findOne({ email });
        if (!accountResult)
            return null;
        return mongodb_helper_1.MongoHelper.map(accountResult);
    }
    async updateAccessToken(id, token) {
        const accountCollection = await mongodb_helper_1.MongoHelper.getCollection('accounts');
        const objectId = mongodb_helper_1.MongoHelper.makeObjectId(id);
        await accountCollection.updateOne({ _id: objectId }, { $set: { accessToken: token } });
    }
}
exports.AccountMongoRepository = AccountMongoRepository;
