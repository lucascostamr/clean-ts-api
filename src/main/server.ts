import { MongoHelper } from '../infra/db/mongodb/helper/mongodb-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port as number, '0.0.0.0', () => { console.log(`Listening at port ${env.port}`) })
  })
  .catch(console.error)
