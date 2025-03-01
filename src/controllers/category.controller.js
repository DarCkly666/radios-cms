import { Category } from '../models/category.js'

export const getAll = async (req, res) => {
  try {
    const categories = await Category.findAll()
    return res.render('category/index', { categories })
  } catch (error) {
    return res.status(500).json({ error: 'Error retrieving categories', errorMessage: error.message })
  }
}

export const getById = async (req, res) => {
  try {
    const { id } = req.params
    const category = await Category.findByPk(id)
    if (!category) {
      return res.render('shared/not_found')
    }
    return res.render('category/show', { category })
  } catch (error) {
    return res.status(500).json({ error: 'Error retrieving category', errorMessage: error.message })
  }
}

export const create = async (req, res) => {
  return res.render('category/new')
}

export const save = async (req, res) => {
  try {
    const { name } = req.body
    await Category.create({ name })
    return res.redirect('/category')
  } catch (error) {
    let errors = []
    if (error.name === 'SequelizeUniqueConstraintError') {
      errors.push('Name already exists')
      return res.render('category/new', { errors })
    } else if (error.name === 'SequelizeValidationError') {
      errors = error.errors.map(error => error.message)
      return res.render('category/new', { errors })
    }
    return res.status(500).json({ error: 'Error creating category', errorMessage: error.message })
  }
}

export const edit = async (req, res) => {
  try {
    const { id } = req.params
    const category = await Category.findByPk(id)
    if (!category) {
      return res.render('shared/not_found')
    }
    return res.render('category/edit', { category })
  } catch (error) {
    return res.status(500).json({ error: 'Error retrieving category', errorMessage: error.message })
  }
}

export const update = async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const category = await Category.findByPk(id)
  try {
    if (!category) {
      return res.render('shared/not_found')
    }
    await Category.update({ name }, { where: { id } })
    return res.redirect('/category')
  } catch (error) {
    let errors = []
    if (error.name === 'SequelizeUniqueConstraintError') {
      errors.push('Name already exists')
      return res.render('category/edit', { category, errors })
    } else if (error.name === 'SequelizeValidationError') {
      errors = error.errors.map(error => error.message)
      return res.render('category/edit', { category, errors })
    }
    return res.status(500).json({ error: 'Error updating category', errorMessage: error.message })
  }
}

export const remove = async (req, res) => {
  const { id } = req.params
  const category = await Category.findByPk(id)
  if (!category) {
    return res.render('shared/not_found')
  }
  return res.render('category/delete', { category })
}

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params
    const category = await Category.findByPk(id)
    if (!category) {
      return res.render('shared/not_found')
    }
    await Category.destroy({ where: { id } })
    return res.redirect('/category')
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting category', errorMessage: error.message })
  }
}
