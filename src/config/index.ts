import dotenv from 'dotenv-safe'

dotenv.config()

const PORT = process.env.PORT ?? 3000
const NODE_ENV = process.env.NODE_ENV ?? 'dev'
const JWT_SECRET = process.env.JWT_SECRET ?? 'error'
const DB_ACCESS = process.env.DB_ACCESS ?? ''
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? ''
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? ''
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI ?? ''

export {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  DB_ACCESS,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
}
