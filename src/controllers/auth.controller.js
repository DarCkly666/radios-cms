import i18n from '../config/i18n.js'
import { User } from '../models/user.js'
import { comparePassword, generateToken } from '../utils/crypto.js'
import { NODE_ENV } from '../config/config.js'

const labels = {
  email: i18n.__('titles.email'),
  password: i18n.__('titles.password'),
  login: i18n.__('titles.login'),
  invalidCredentials: i18n.__('messages.invalidCredentials')
}

export const showLogin = async (req, res) => {
  try {
    return res.render('auth/login', { layout: false, labels })
  } catch (error) {
    console.log(error)
    res.render('shared/error_500')
  }
}

export const login = async (req, res) => {
  try {
    const { email = '', password = '' } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.render('auth/login', { layout: false, labels, errors: [labels.invalidCredentials] })
    }
    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) {
      return res.render('auth/login', { layout: false, labels, errors: [labels.invalidCredentials] })
    }
    const token = generateToken({ id: user.id, name: user.name, email: user.email, role: user.role })
    res.cookie('token', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict'
    })
    return res.redirect('/')
  } catch (error) {
    console.log(error)
    res.render('shared/error_500', { layout: false })
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie('token')
    return res.redirect('/login')
  } catch (error) {
    console.log(error)
    res.render('shared/error_500', { layout: false })
  }
}
