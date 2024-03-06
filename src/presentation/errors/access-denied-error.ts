export class AccessDeniedError extends Error {
  constructor () {
    super('Acess denied')
    this.name = 'AccessDeniedError'
  }
}
