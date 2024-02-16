import { type AccountModel } from '../../../domain/models/account'
import { type LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'
import { DbAuthentication } from './db-authentication'

describe('Db Authenticaiton', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      async load (email: string): Promise<AccountModel> {
        return await new Promise(resolve => {
          resolve({
            id: 'any_id',
            email: 'any_email@mail.com',
            name: 'any_name',
            password: 'any_password'
          })
        })
      }
    }
    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    const authentication = {
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    await sut.auth(authentication)
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
