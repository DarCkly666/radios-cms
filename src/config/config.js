import dotenv from 'dotenv'

dotenv.config()
export const {
  PORT = 3000,
  DB_HOST = 'localhost',
  DB_USER = 'postgres',
  DB_PASS = 'postgres',
  DB_NAME = 'radios',
  DB_PORT = 5432,
  SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10,
  JWT_SECRET = 'super_secret_key',
  NODE_ENV = 'development'
} = process.env
