import { type Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  readdirSync(path.join(__dirname, '..', 'routes')).forEach(async file => {
    if (!file.toString().includes('.test.')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
