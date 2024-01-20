import { type Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

describe('DbAddAccount test', () => {
  test('Shoud call Encrypter with correct password', async () => {
    class EcrypterStub implements Encrypter {
      async encrypt (password: string): Promise<string> {
        return await new Promise(resolve => { resolve('hashedPassword') })
      }
    }

    const encrypterStub = new EcrypterStub()
    const sut = new DbAddAccount(encrypterStub)

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(account)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
