import { Category } from '../../models/category.js'

export const getAll = async (req, res) => {
  try {
    const categories = await Category.findAll()
    return res.status(200).json({ data: categories })
  } catch (error) {
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}

export const getById = async (req, res) => {
  try {
    const { id } = req.params
    const category = await Category.findByPk(id)
    if (!category) {
      return res.status(404).json({ errors: ['Category not found'] })
    }
    return res.status(200).json({ data: category })
  } catch (error) {
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}

export const create = async (req, res) => {
  try {
    const { name } = req.body
    const category = await Category.create({ name })
    return res.status(201).json({ data: category })
  } catch (error) {
    let errors = []
    if (error.name === 'SequelizeUniqueConstraintError') {
      errors.push('Category already exists')
      return res.status(409).json({ errors })
    } else if (error.name === 'SequelizeValidationError') {
      errors = error.errors.map(error => error.message)
      return res.status(400).json({ errors })
    }
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body
    const category = await Category.findByPk(id)
    if (!category) {
      return res.status(404).json({ errors: ['Category not found'] })
    }
    await category.update({ name })
    return res.status(200).json({ data: category })
  } catch (error) {
    let errors = []
    if (error.name === 'SequelizeUniqueConstraintError') {
      errors.push('Category already exists')
      return res.status(409).json({ errors })
    } else if (error.name === 'SequelizeValidationError') {
      errors = error.errors.map(error => error.message)
      return res.status(400).json({ errors })
    }
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params
    const category = await Category.findByPk(id)
    if (!category) {
      return res.status(404).json({ errors: ['Category not found'] })
    }
    await category.destroy()
    return res.status(204).json({ data: category })
  } catch (error) {
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}
