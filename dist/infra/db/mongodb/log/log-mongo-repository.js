"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogMongoRepository = void 0;
const mongodb_helper_1 = require("../helper/mongodb-helper");
class LogMongoRepository {
    async logError(stack) {
        const errorCollection = await mongodb_helper_1.MongoHelper.getCollection('errors');
        await errorCollection.insertOne({
            stack,
            date: new Date()
        });
    }
}
exports.LogMongoRepository = LogMongoRepository;
