import { MongoMemoryServer } from 'mongodb-memory-server'

export const MongoMemoryHelper = {
  server: null as MongoMemoryServer | null,

  async makeMongoMemoryServer (): Promise<void> {
    if (!this.server) this.server = await MongoMemoryServer.create()
  },

  async stopMongoMemoryServer (): Promise<void> {
    if (this.server) this.server.stop()
    this.server = null
  }
}
