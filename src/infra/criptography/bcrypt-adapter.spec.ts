import bcrypt from 'bcrypt'

import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => { resolve('hash') })
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('password')
    expect(hashSpy).toHaveBeenLastCalledWith('password', salt)
  })

  test('Should return a hash on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)

    const response = await sut.encrypt('password')
    expect(response).toBe('hash')
  })
})
