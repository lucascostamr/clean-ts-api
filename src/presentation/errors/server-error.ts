export class ServerError extends Error {
  constructor (stack?: string) {
    super('Server Error')
    this.name = 'ServerError'
    this.stack = stack
  }
}
