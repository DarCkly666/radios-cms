import { Category } from '../models/category.js'
import i18n from '../config/i18n.js'

export const getAll = async (req, res) => {
  try {
    const categories = await Category.findAll()
    return res.render('category/index', {
      categories,
      lblCategories: i18n.__('titles.categories'),
      lblNew: i18n.__('titles.new'),
      lblEdit: i18n.__('titles.edit'),
      lblDelete: i18n.__('titles.delete'),
      lblId: i18n.__('titles.id'),
      lblName: i18n.__('titles.name'),
      lblCreatedAt: i18n.__('titles.createdAt'),
      lblUpdatedAt: i18n.__('titles.updatedAt'),
      lblActions: i18n.__('titles.actions')
    })
  } catch (error) {
    return res.render('shared/error_500')
  }
}

export const getById = async (req, res) => {
  try {
    const { id } = req.params
    const category = await Category.findByPk(id)
    if (!category) {
      return res.render('shared/error_404')
    }
    return res.render('category/show', { category })
  } catch (error) {
    return res.render('shared/error_500')
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
      errors.push(i18n.__('validations.existsName'))
      return res.render('category/new', { errors })
    } else if (error.name === 'SequelizeValidationError') {
      errors = error.errors.map(error => error.message)
      return res.render('category/new', { errors })
    }
    return res.render('shared/error_500')
  }
}

export const edit = async (req, res) => {
  try {
    const { id } = req.params
    const category = await Category.findByPk(id)
    if (!category) {
      return res.render('shared/error_404')
    }
    return res.render('category/edit', { category })
  } catch (error) {
    return res.render('shared/error_500')
  }
}

export const update = async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const category = await Category.findByPk(id)
  try {
    if (!category) {
      return res.render('shared/error_404')
    }
    await Category.update({ name }, { where: { id } })
    return res.redirect('/category')
  } catch (error) {
    let errors = []
    if (error.name === 'SequelizeUniqueConstraintError') {
      errors.push(i18n.__('validations.existsName'))
      return res.render('category/edit', { category, errors })
    } else if (error.name === 'SequelizeValidationError') {
      errors = error.errors.map(error => error.message)
      return res.render('category/edit', { category, errors })
    }
    return res.render('shared/error_500')
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params
    const category = await Category.findByPk(id)
    if (!category) {
      return res.render('shared/error_404')
    }
    return res.render('category/delete', { category })
  } catch (e) {
    return res.render('shared/error_500')
  }
}

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params
    const category = await Category.findByPk(id)
    if (!category) {
      return res.render('shared/error_404')
    }
    await Category.destroy({ where: { id } })
    return res.redirect('/category')
  } catch (error) {
    return res.render('shared/error_500')
  }
}
