export default {
  mongoUrl: process.env.MONGO_URI ?? '',
  port: process.env.SERVER_PORT ?? 3000,
  jwtSecret: process.env.JWT_SECRET ?? 'secret'
}
