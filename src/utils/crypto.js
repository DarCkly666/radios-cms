import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../config/config.js'

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  return await bcrypt.hash(password, salt)
}

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}
