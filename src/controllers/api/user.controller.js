import { User } from '../../models/user.js'

export const getAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    })
    return res.status(200).json({ data: users })
  } catch (e) {
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}

export const getById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } })
    if (!user) {
      return res.status(404).json({ errors: ['User not found'] })
    }
    return res.status(200).json({ data: user })
  } catch (error) {
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}

export const create = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const user = await User.create({ name, email, password, role })
    const { name: username } = user
    return res.status(201).json({ data: username })
  } catch (error) {
    console.log(error)
    let errors = []
    if (error.name === 'SequelizeValidationError') {
      errors = error.errors.map(error => error.message)
      return res.status(400).json({ errors })
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      errors = error.errors.map(error => error.message)
      return res.status(400).json({ errors })
    }
    return res.status(500).json({ errors: ['Unknown error'] })
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
    return res.status(204).json({ data: user })
  } catch (error) {
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, password, role } = req.body
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ errors: ['User not found'] })
    }
    await user.update({ name, email, password, role })
    const { name: username } = user
    return res.status(200).json({ data: username })
  } catch (error) {
    let errors = []
    if (error.name === 'SequelizeValidationError') {
      errors = error.errors.map(error => error.message)
      return res.status(400).json({ errors })
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      errors = error.errors.map(error => error.message)
      return res.status(400).json({ errors })
    }
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}
