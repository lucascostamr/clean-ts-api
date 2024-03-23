import { type Decrypter } from '../../../data/protocols/criptograph/decrypter'
import { type Encrypter } from '../../../data/protocols/criptograph/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const token = jwt.sign({ id: value }, this.secret)
    return await new Promise(resolve => { resolve(token) })
  }

  async decrypt (value: string): Promise<string | null> {
    const response = jwt.verify(value, this.secret)
    return await new Promise(resolve => { resolve(response as string) })
  }
}
