import { User } from '../../models/user.js'
import { comparePassword, generateToken } from '../../utils/crypto.js'

export const login = async (req, res) => {
  try {
    const { email = '', password: pwd = '' } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const isPasswordValid = await comparePassword(pwd, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const token = generateToken({ id: user.id, name: user.name, email: user.email, role: user.role })
    return res.status(200).json({ token })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' })
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
