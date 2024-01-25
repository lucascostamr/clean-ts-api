import request from 'supertest'
import app from '../config/app'

describe('Cors', () => {
  test('Should return content-type json as default', async () => {
    app.get('/test_content_type', (req: any, res: any): void => {
      res.send('')
    })

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  test('Should return xlm when content-type forced', async () => {
    app.get('/test_content_type_xml', (req: any, res: any): void => {
      res.type('xml')
      res.send('')
    })

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
