import { MongoMemoryHelper as sut } from './mongodb-memory-server'

describe('Mongo Memory Server', () => {
  test('Should makeMongoMemory set new mongo memory server if server is null', async () => {
    if (!sut.server) await sut.makeMongoMemoryServer()
    expect(sut.server).toBeTruthy()
  })

  test('Should stop mongo memory server if there\'s a server', async () => {
    if (sut.server) await sut.stopMongoMemoryServer()
    expect(sut.server).toBeNull()
  })
})
