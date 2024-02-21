import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'token'
  }
}))

describe('JWT Adapter', () => {
  test('Should call jwt sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_value')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secret')
  })

  test('Should throw if jwt sign throws', async () => {
    const sut = new JwtAdapter('secret')
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    const response = sut.encrypt('any_value')
    await expect(response).rejects.toThrow(new Error())
  })

  test('Should return token on success', async () => {
    const sut = new JwtAdapter('secret')
    const response = await sut.encrypt('any_value')
    expect(response).toBe('token')
  })
})
