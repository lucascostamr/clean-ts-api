import { type Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient | null,
  mongoMemory: null as any | null,

  async makeMongoMemory (): Promise<void> {
    const mongoMemoryServer = ((await import('mongodb-memory-server')).MongoMemoryServer)
    this.mongoMemory = await mongoMemoryServer.create()
  },

  async stopMongoMemory (): Promise<void> {
    await this.mongoMemory.stop()
    this.mongoMemory = null
  },

  async connect (uri: string = '' as string): Promise<void> {
    if (!uri) {
      await this.makeMongoMemory()
      uri = this.mongoMemory?.getUri() as string
    }

    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client?.close()

    if (this.mongoMemory) await this.stopMongoMemory()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map (collection: any): any {
    const { _id, ...collectionNoId } = collection
    return Object.assign({}, collectionNoId, { id: _id })
  }
}
