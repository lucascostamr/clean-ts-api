export class EmailInUseError extends Error {
  constructor () {
    super('Email provided already in use')
    this.name = 'EmailInUseError'
  }
}
