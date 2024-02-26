import { type Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  readdirSync(path.join(__dirname, '..', 'routes')).forEach(async file => {
    const filePath = file.toString()
    if (!filePath.includes('.test.') && !filePath.includes('.map')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
