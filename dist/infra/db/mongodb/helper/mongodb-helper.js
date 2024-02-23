"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoHelper = void 0;
const mongodb_1 = require("mongodb");
exports.MongoHelper = {
    client: null,
    uri: null,
    async connect(uri) {
        this.client = await mongodb_1.MongoClient.connect(uri);
        this.uri = uri;
    },
    async disconnect() {
        await this.client?.close();
        this.client = null;
    },
    async getCollection(name) {
        if (!this.client)
            await this.connect(this.uri);
        return this.client.db().collection(name);
    },
    map(collection) {
        const { _id, ...collectionNoId } = collection;
        return Object.assign({}, collectionNoId, { id: _id });
    },
    makeObjectId(id) {
        return new mongodb_1.ObjectId(id);
    }
};
