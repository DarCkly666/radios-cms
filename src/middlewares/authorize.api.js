import { getPayload } from '../utils/crypto.js'

export const authorizeAPI = (...allowedRoles) => (req, res, next) => {
  const { token } = req
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const decoded = getPayload(token)

  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  if (!allowedRoles.includes(decoded.role)) {
    return res.status(403).json({ message: 'Unauthorized' })
  }
  next()
}
