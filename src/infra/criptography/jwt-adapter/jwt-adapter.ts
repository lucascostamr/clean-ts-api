import { type Encrypter } from '../../../data/protocols/criptograph/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const token = jwt.sign({ id: value }, this.secret)
    return await new Promise(resolve => { resolve(token) })
  }
}
