import { type Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient | null,
  uri: null as string | null,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
    this.uri = uri
  },

  async disconnect (): Promise<void> {
    await this.client?.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) await this.connect(this.uri as string)
    return this.client.db().collection(name)
  },

  map (collection: any): any {
    const { _id, ...collectionNoId } = collection
    return Object.assign({}, collectionNoId, { id: _id })
  }
}
