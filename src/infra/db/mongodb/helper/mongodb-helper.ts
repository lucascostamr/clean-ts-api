import { type Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient | null,
  mongoMemoryHelper: null as any | null,

  async connect (uri: string = '' as string): Promise<void> {
    if (!uri) {
      this.mongoMemoryHelper = (await import('./mongodb-memory-server')).MongoMemoryHelper
      await this.mongoMemoryHelper.makeMongoMemoryServer()

      uri = this.mongoMemoryHelper.server?.getUri() as string
    }

    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client?.close()
    this.client = null

    if (this.mongoMemoryHelper.server) await this.mongoMemoryHelper.stopMongoMemoryServer()
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) await this.connect()

    return this.client.db().collection(name)
  },

  map (collection: any): any {
    const { _id, ...collectionNoId } = collection
    return Object.assign({}, collectionNoId, { id: _id })
  }
}
