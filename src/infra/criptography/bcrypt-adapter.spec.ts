import bcrypt from 'bcrypt'

import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => { resolve('hash') })
  },

  async compare (): Promise<boolean> {
    return await new Promise(resolve => { resolve(true) })
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  const sut = new BcryptAdapter(salt)

  return sut
}

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenLastCalledWith('any_value', salt)
  })

  test('Should return a hash on hash success', async () => {
    const sut = makeSut()
    const response = await sut.hash('any_value')
    expect(response).toBe('hash')
  })

  test('Should throw up error BcryptAdapter throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => { await new Promise((resolve, reject) => { reject(new Error()) }) })
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'hash')
    expect(compareSpy).toHaveBeenLastCalledWith('any_value', 'hash')
  })

  test('Should return true if compare succeeds', async () => {
    const sut = makeSut()
    const response = await sut.compare('any_value', 'hash')
    expect(response).toBe(true)
  })

  test('Should return false if compare fails', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async (): Promise<boolean> => await new Promise(resolve => { resolve(false) }))
    const response = await sut.compare('any_value', 'hash')
    expect(response).toBe(false)
  })
})
