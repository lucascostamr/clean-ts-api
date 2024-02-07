import request from 'supertest'
import app from '../config/app'

describe('Body Parser', () => {
  test('Should parse body to json', async () => {
    app.post('/test_body_parser', (req: any, res: any): void => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Lucas' })
      .expect({ name: 'Lucas' })
  })
})
