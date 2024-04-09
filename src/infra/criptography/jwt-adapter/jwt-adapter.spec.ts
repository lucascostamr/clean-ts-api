import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'any_token'
  },
  verify (): string {
    return 'any_value'
  }
}))

type SutTypes = {
  sut: JwtAdapter
}

const makeSut = (): SutTypes => {
  const sut = new JwtAdapter('secret')
  return {
    sut
  }
}

describe('JWT Adapter', () => {
  describe('sign()', () => {
    test('Should call jwt sign with correct values', async () => {
      const { sut } = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_value')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secret')
    })

    test('Should throw if jwt sign throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
      const response = sut.encrypt('any_value')
      await expect(response).rejects.toThrow(new Error())
    })

    test('Should return token on success', async () => {
      const { sut } = makeSut()
      const response = await sut.encrypt('any_value')
      expect(response).toBe('any_token')
    })
  })

  describe('verify()', () => {
    test('Should call jwt verify with correct values', async () => {
      const { sut } = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
    })

    test('Should throw if jwt verify throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => { throw new Error() })
      const response = sut.decrypt('any_token')
      await expect(response).rejects.toThrow(new Error())
    })

    test('Should return value on jwt verify success', async () => {
      const { sut } = makeSut()
      const response = await sut.decrypt('any_token')
      expect(response).toBe('any_value')
    })
  })
})
