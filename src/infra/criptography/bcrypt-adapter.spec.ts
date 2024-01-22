import bcrypt from 'bcrypt'

import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => { resolve('hash') })
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  const sut = new BcryptAdapter(salt)

  return sut
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('password')
    expect(hashSpy).toHaveBeenLastCalledWith('password', salt)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()

    const response = await sut.encrypt('password')
    expect(response).toBe('hash')
  })
})
