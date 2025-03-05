import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SALT_ROUNDS, JWT_SECRET } from '../config/config.js'

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(parseInt(SALT_ROUNDS))
  return await bcrypt.hash(password, salt)
}

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' })
}

export const getPayload = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return null
  }
}
