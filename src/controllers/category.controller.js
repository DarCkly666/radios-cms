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
      return res.status(404).json({ error: 'Category not found' })
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
    return res.status(500).json({ error: 'Error creating category', errorMessage: error.message })
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body
    const category = await Category.update({ name }, { where: { id } })
    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }
    return res.redirect(`/category/${id}`)
  } catch (error) {
    return res.status(500).json({ error: 'Error updating category', errorMessage: error.message })
  }
}

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params
    const category = await Category.destroy({ where: { id } })
    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }
    return res.redirect('/category')
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting category', errorMessage: error.message })
  }
}
