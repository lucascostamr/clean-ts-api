import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

describe('JWT Adapter', () => {
  test('Should call jwt sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_value')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secret')
  })
})
