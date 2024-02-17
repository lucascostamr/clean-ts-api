import { type Authentication, type AuthenticationModel } from '../../../domain/usercases/authentication'
import { type HashComparer } from '../../protocols/criptograph/hash-comparer'
import { type TokenGenerator } from '../../protocols/criptograph/token-generator'
import { type LoadAccountByEmailRepository } from '../../protocols/database/load-account-by-email-repository'
import { type UpdateAccessTokenRepository } from '../../protocols/database/update-access-token-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator,
    updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (!isValid) return null
      const accessToken = await this.tokenGenerator.generate(account.id)
      await this.updateAccessTokenRepository.update(account.id, accessToken)
      return accessToken
    }
    return null
  };
}
