import { User, Role } from '../../models/user.js'
import i18n from '../../config/i18n.js'

const labels = {
  id: i18n.__('titles.id'),
  name: i18n.__('titles.name'),
  email: i18n.__('titles.email'),
  role: i18n.__('titles.role'),
  createdAt: i18n.__('titles.createdAt'),
  updatedAt: i18n.__('titles.updatedAt'),
  actions: i18n.__('titles.actions'),
  edit: i18n.__('titles.edit'),
  delete: i18n.__('titles.delete'),
  new: i18n.__('titles.new'),
  users: i18n.__('titles.users'),
  password: i18n.__('titles.password'),
  save: i18n.__('titles.save'),
  cancel: i18n.__('titles.cancel'),
  user: i18n.__('titles.user'),
  selectOne: i18n.__('validations.selectOne'),
  deleteUser: i18n.__('messages.deleteUser')
}

export const showAll = async (req, res) => {
  try {
    const users = await User.findAll()
    return res.render('user/index', { users, labels })
  } catch (e) {
    return res.render('shared/error_500')
  }
}

export const showNew = async (req, res) => {
  try {
    return res.render('user/new', { labels, roles: Object.values(Role) })
  } catch (e) {
    return res.render('shared/error_500')
  }
}

export const save = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    await User.create({ name, email, password, role })
    return res.redirect('/user')
  } catch (error) {
    console.log(error)
    if (error.name === 'SequelizeValidationError') {
      let errors = []
      errors = error.errors.map(error => error.message)
      return res.render('user/new', { errors, labels, roles: Object.values(Role) })
    }
    return res.render('shared/error_500')
  }
}

export const showRemove = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id)
    if (!user) {
      return res.render('shared/error_404')
    }
    return res.render('user/delete', { user, labels })
  } catch (error) {
    return res.render('shared/error_500')
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id)
    if (!user) {
      return res.render('shared/error_404')
    }
    await user.destroy()
    return res.redirect('/user')
  } catch (error) {
    return res.render('shared/error_500')
  }
}

/* export const showEdit = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id)
    if (!user) {
      return res.render('shared/error_404')
    }
    return res.render('user/edit', { user })
  } catch (error) {
    return res.render('shared/error_500')
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, password, role } = req.body
    const user = await User.findByPk(id)
    if (!user) {
      return res.render('shared/error_404')
    }
    user.name = name
    user.email = email
    user.password = password
    user.role = role
    await user.save()
    return res.redirect('/user')
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      let errors = []
      errors = error.errors.map(error => error.message)
      return res.render('user/edit', { errors, user: error.instance })
    }
    return res.render('shared/error_500')
  }
}
*/
