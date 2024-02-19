import { type Hasher, type AddAccountModel, type AccountModel, type AddAccountRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => { resolve(makeFakeAccount()) })
    }
  }
  return new AddAccountRepositoryStub()
}

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (password: string): Promise<string> {
      return await new Promise(resolve => { resolve('hashed_password') })
    }
  }
  return new HasherStub()
}

const makeFakeAddAccount = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
})

interface SutTypes {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const hasherStub = makeHasher()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount test', () => {
  test('Shoud call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(makeFakeAddAccount())
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Shoud throw up the error Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockRejectedValueOnce(new Error())
    const promise = sut.add(makeFakeAddAccount())
    await expect(promise).rejects.toThrow(new Error())
  })

  test('Shoud call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(makeFakeAddAccount())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('Shoud throw up the error AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(makeFakeAddAccount())
    await expect(promise).rejects.toThrow()
  })

  test('Should AddAccountRepository return account on success ', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeAddAccount())
    expect(account).toEqual(makeFakeAccount())
  })
})
