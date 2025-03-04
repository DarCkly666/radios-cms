import i18n from '../config/i18n.js'
import { User } from '../models/user.js'
import { comparePassword } from '../utils/crypto.js'

const labels = {
  email: i18n.__('titles.email'),
  password: i18n.__('titles.password'),
  login: i18n.__('titles.login'),
  invalidCredentials: i18n.__('messages.invalidCredentials')
}

export const showLogin = async (req, res) => {
  try {
    return res.render('auth/login', { labels })
  } catch (error) {
    console.log(error)
    res.render('shared/error_500')
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.render('auth/login', { labels, errors: [labels.invalidCredentials] })
    }
    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) {
      return res.render('auth/login', { labels, errors: [labels.invalidCredentials] })
    }
    req.session.userId = user.id
    return res.redirect('/user')
  } catch (error) {
    console.log(error)
    res.render('shared/error_500')
  }
}
