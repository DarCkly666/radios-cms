import { User } from '../models/user.js'
import { getPayload } from '../utils/crypto.js'

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.redirect('/login')
    }

    const decoded = getPayload(token)

    if (!decoded) {
      res.clearCookie('token')
      return res.redirect('/login')
    }

    const user = await User.findByPk(decoded.id)
    if (!user) {
      res.clearCookie('token')
      return res.redirect('/login')
    }
    const { password, ...safeUser } = user.get({ plain: true })
    req.user = safeUser
    res.locals.user = safeUser
    next()
  } catch (error) {
    console.error(error)
    res.render('shared/error_500', { layout: false })
  }
}
