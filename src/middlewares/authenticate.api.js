import { User } from '../models/user.js'
import { getPayload } from '../utils/crypto.js'

export const authenticateAPI = async (req, res, next) => {
  try {
    let token = req.headers.authorization

    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    if (!token.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    token = token.replace('Bearer ', '')

    const decoded = getPayload(token)

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    const user = await User.findByPk(decoded.id)
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    req.token = token
    next()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
